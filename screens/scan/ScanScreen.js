// // screens/scan/ScanScreen.js
// import React, { useCallback, useRef, useState } from "react";
// import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import * as Haptics from "expo-haptics";
// import { recognize } from "../../src/native/TextRecognizer";

// const FRAME_ASPECT = 1.2;

// export default function ScanScreen() {
//   const camRef = useRef(null);
//   const [permission, requestPermission] = useCameraPermissions();
//   const [spinning, setSpinning] = useState(false);

//   // 🧪 Saca UNA foto, corre OCR y muestra resultado
//   const testOCROnce = useCallback(async () => {
//     try {
//       if (!camRef.current) return;
//       setSpinning(true);

//       const shot = await camRef.current.takePictureAsync({
//         base64: true,
//         quality: Platform.OS === "ios" ? 0.8 : 0.8,
//         skipProcessing: false, // deja orientación/nitidez del SO
//         exif: false,
//         // imageType: "jpg", // si tu SDK lo soporta, activalo
//       });

//       if (!shot?.base64) {
//         Alert.alert("OCR test", "No salió base64 de la cámara");
//         return;
//       }

//       let lines = [];
//       try {
//         lines = await recognize(shot.base64);
//       } catch {
//         lines = await recognize(`data:image/jpeg;base64,${shot.base64}`);
//       }

//       const tokens = Array.isArray(lines)
//         ? lines.join(" ").split(/\s+/).filter(Boolean).length
//         : 0;

//       // feedback háptico si lee algo
//       if (tokens > 0) {
//         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
//       }

//       Alert.alert(
//         "OCR test",
//         `tokens: ${tokens}\n\nPrimeras líneas:\n${
//           Array.isArray(lines) ? lines.slice(0, 5).join("\n") : String(lines)
//         }`
//       );
//     } catch (e) {
//       Alert.alert("OCR test — error", String(e?.message || e));
//     } finally {
//       setSpinning(false);
//     }
//   }, []);

//   if (!permission) {
//     requestPermission();
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView ref={camRef} style={StyleSheet.absoluteFill} facing="back" />

//       {/* Marco visual */}
//       <View pointerEvents="none" style={styles.frameWrapper}>
//         <View style={styles.frame} />
//       </View>

//       {/* Botón de prueba OCR */}
//       <Pressable onPress={testOCROnce} style={styles.ocrTestBtn}>
//         <Text style={styles.ocrTestTxt}>Probar OCR</Text>
//       </Pressable>

//       {spinning && (
//         <View style={styles.spinnerWrap}>
//           <ActivityIndicator color="#fff" />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000" },
//   frameWrapper: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center" },
//   frame: {
//     width: "78%",
//     aspectRatio: FRAME_ASPECT,
//     borderRadius: 16,
//     borderWidth: 3,
//     borderColor: "rgba(255,255,255,0.9)",
//     backgroundColor: "transparent",
//   },
//   ocrTestBtn: {
//     position: "absolute",
//     bottom: 40,
//     right: 20,
//     backgroundColor: "#111827",
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     borderRadius: 12,
//   },
//   ocrTestTxt: { color: "#fff", fontWeight: "700" },
//   spinnerWrap: {
//     position: "absolute",
//     bottom: 100,
//     alignSelf: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 12,
//     borderRadius: 999,
//   },
// });

// screens/scan/ScanScreen.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import CustomHeader from "../../src/components/CustomHeader";
import { MinimalBackButton } from "../../src/components/CustomHeader";
import ProductCards from "../../src/components/ProductCards";
import { recognize, matchProductByText } from "../../src/native/TextRecognizer";
import products from "../../assets/data/products.json";
import { useNavigation } from "@react-navigation/native";

const SCAN_INTERVAL_MS = 1200; // tu timing original
const FRAME_ASPECT = 1.2;
const MATCH_OPTS = { threshold: 0.1, minHits: 2 };
const HEADER_H = 56;

export default function ScanScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const camRef = useRef(null);

  // loop robusto (sin setInterval)
  const runningRef = useRef(false);
  const tickingRef = useRef(false);
  const appStateRef = useRef("active");

  // permisos
  const [permission, requestPermission] = useCameraPermissions();

  // UI
  const [message, setMessage] = useState("Alineá la etiqueta dentro del marco");
  const [spinning, setSpinning] = useState(false);
  const [detectedProduct, setDetectedProduct] = useState(null);

  // debug
  const [dbg, setDbg] = useState({
    phase: "INIT",
    snaps: 0,
    tokens: 0,
    hits: "—",
    score: "0.000",
    err: "",
  });

  // pedir permisos
  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) await requestPermission();
    })();
  }, []);

  // pausa/reanuda por estado de app (por si aparecen banners del SO)
  useEffect(() => {
    const sub = AppState.addEventListener("change", (next) => {
      appStateRef.current = next;
      if (next !== "active") {
        runningRef.current = false; // pausa
        tickingRef.current = false;
        setSpinning(false);
      } else if (permission?.granted) {
        startLoop(); // reanuda
      }
    });
    return () => sub.remove();
  }, [permission?.granted]);

  // cámara lista → arrancar loop
  const onCameraReady = useCallback(() => {
    setDbg((d) => ({ ...d, phase: "READY", err: "" }));
    if (permission?.granted) startLoop();
  }, [permission?.granted]);

  // ===== loop =====
  const startLoop = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    runOnce();
  }, []);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const runOnce = useCallback(async () => {
    if (!runningRef.current) return;
    if (tickingRef.current) return;
    if (appStateRef.current !== "active") {
      setTimeout(runOnce, SCAN_INTERVAL_MS);
      return;
    }
    tickingRef.current = true;
    try {
      await tick();
    } finally {
      tickingRef.current = false;
      if (runningRef.current) setTimeout(runOnce, SCAN_INTERVAL_MS);
    }
  }, [tick]);

  // una iteración de captura + OCR + match
  const tick = useCallback(async () => {
    if (!camRef.current) return;
    try {
      setSpinning(true);
      setDbg((d) => ({ ...d, phase: "SNAP", snaps: d.snaps + 1, err: "" }));

      // pequeña pausa para autofocus si venías moviendo
      await sleep(80);

      const shot = await camRef.current.takePictureAsync({
        base64: true,
        quality: Platform.OS === "ios" ? 0.8 : 0.8,
        skipProcessing: false, // deja orientación/nitidez del SO
        exif: false,
        // imageType: "jpg", // si tu SDK lo soporta, activalo
      });
      if (!shot?.base64) throw new Error("No base64 de la cámara");

      setDbg((d) => ({ ...d, phase: "OCR" }));

      let lines = [];
      try {
        lines = await recognize(shot.base64);
      } catch {
        // fallback por si el nativo espera data-uri
        lines = await recognize(`data:image/jpeg;base64,${shot.base64}`);
      }

      const tokens = Array.isArray(lines)
        ? lines.join(" ").split(/\s+/).filter(Boolean).length
        : 0;
      setDbg((d) => ({ ...d, tokens }));

      const { product, score, hits } = matchProductByText(
        lines,
        products,
        MATCH_OPTS
      );

      setDbg((d) => ({
        ...d,
        phase: "MATCH",
        score: (score ?? 0).toFixed(3),
        hits: (hits || []).slice(0, 8).join(" · ") || "—",
      }));

      if (product) {
        setDetectedProduct(product);
        setMessage(null);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        // pausa mínima para no sobre-escanear mientras se muestra la card
        await sleep(300);
      } else {
        setDetectedProduct(null);
        setMessage("Alineá la etiqueta dentro del marco");
      }
    } catch (e) {
      setDetectedProduct(null);
      setMessage("Alineá la etiqueta dentro del marco");
      setDbg((d) => ({ ...d, phase: "ERROR", err: e?.message || String(e) }));
    } finally {
      setSpinning(false);
    }
  }, []);

  // cleanup
  useEffect(
    () => () => {
      runningRef.current = false;
    },
    []
  );

  if (!permission) return null;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Se necesita acceso a la cámara</Text>
        <Text style={styles.note}>
          Habilitalo en Configuración para continuar.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        pointerEvents="box-none"
        style={[styles.headerOverlay, { paddingTop: insets.top + 4 }]}
      >
        <MinimalBackButton onPress={() => navigation.goBack()} />
      </View>
      <CameraView
        ref={camRef}
        style={StyleSheet.absoluteFill}
        facing="back"
        mode="picture"
        onCameraReady={onCameraReady}
        videoStabilizationMode="auto"
        zoom={0}
        autofocus="on"
        photoQualityBalance="quality"
      />

      {!!message && (
        <View style={[styles.topBanner, { top: insets.top + HEADER_H + 8 }]}>
          <Text style={styles.topBannerText}>{message}</Text>
        </View>
      )}

      {/* Marco */}
      <View pointerEvents="none" style={styles.frameWrapper}>
        <View style={styles.frame} />
      </View>

      {/* Cards sobre el escaneo
      {detectedProduct && (
        <>
          <View style={styles.productCard}>
            <Text style={styles.productTitle}>
              {(detectedProduct.marca || detectedProduct.brand || "").trim()} —{" "}
              {(detectedProduct.nombre || detectedProduct.name || "").trim()}
            </Text>
            {Array.isArray(detectedProduct.sellos || detectedProduct.seals) &&
              (detectedProduct.sellos || detectedProduct.seals).length > 0 && (
                <Text style={styles.productSeals}>
                  Sellos: {(detectedProduct.sellos || detectedProduct.seals).join(" · ")}
                </Text>
              )}
          </View>

          <ProductCards
            product={detectedProduct}
            onClose={() => setDetectedProduct(null)}
          />
        </>
      )} */}

      {detectedProduct && (
        <ProductCards
          product={detectedProduct}
          onClose={() => setDetectedProduct(null)}
        />
      )}

      {/* Debug
      <View style={styles.debugBubble}>
        <Text style={styles.debugText}>
          OCR / MATCH{"\n"}
          • phase: {dbg.phase}{"\n"}
          • snaps: {dbg.snaps}{"\n"}
          • tokens: {dbg.tokens}{"\n"}
          • hits: {dbg.hits}{"\n"}
          • score: {dbg.score}{"\n"}
          {dbg.err ? `• err: ${dbg.err}` : ""}
        </Text>
      </View> */}

      {spinning && (
        <View style={styles.spinnerWrap}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#111" },
  note: { marginTop: 8, color: "#666" },

  topBanner: {
    position: "absolute",
    top: 28 + (Platform.OS === "ios" ? 20 : 0),
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  topBannerText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20, // asegura estar sobre la cámara
  },
  frameWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: "78%",
    aspectRatio: FRAME_ASPECT,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
    backgroundColor: "transparent",
  },

  productCard: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 28 + (Platform.OS === "ios" ? 6 : 0),
    padding: 14,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  productTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
  },
  productSeals: { color: "#f8d477", fontSize: 14 },

  debugBubble: {
    position: "absolute",
    left: 16,
    bottom: 24,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
    maxWidth: "78%",
  },
  debugText: { color: "#fff", fontSize: 12, lineHeight: 16 },

  spinnerWrap: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
});
