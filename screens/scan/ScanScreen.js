// import React, { useCallback, useRef, useState } from "react";
// import { View, Text, ActivityIndicator } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import { getProductByBarcode } from "../../src/services/products";
// import ARInfoOverlay from "../../src/components/ARInfoOverlay";

// export default function ScanScreen({ navigation }) {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const [detectedProduct, setDetectedProduct] = useState(null);
//   const busyRef = useRef(false);

//   const handleScanned = useCallback(async ({ data /*, type*/ }) => {
//     if (busyRef.current) return;
//     busyRef.current = true;
//     setScanned(true);
//     try {
//       const product = await getProductByBarcode(data);
//       setDetectedProduct(product);

//       navigation.navigate("ProductDetails", { product, code: data });
//     } catch (e) {
//       setDetectedProduct(null);
//       setScanned(false);
//       busyRef.current = false;
//       console.warn(e);
//     }
//   }, []);

//   // permisos
//   if (!permission) return <View style={{ flex: 1 }} />;
//   if (!permission.granted) {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
//         <Text style={{ fontSize: 16, textAlign: "center" }}>
//           Necesitamos acceso a la cámara para escanear.
//         </Text>
//         <Text onPress={requestPermission} style={{ marginTop: 12, fontSize: 16 }}>
//           ➜ Conceder permiso
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: "black" }}>
//       <CameraView
//         style={{ flex: 1 }}
//         facing="back"
//         // Usa UNO de estos dos según tu SDK;
//         // si no dispara con el primero, probá el segundo:
//         onBarcodeScanned={scanned ? undefined : handleScanned}
//         // onBarCodeScanned={scanned ? undefined : handleScanned}
//         barcodeScannerSettings={{
//           barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128", "qr"],
//         }}
//       />

//       {/* Overlay RA con la info clara */}
//       {detectedProduct ? <ARInfoOverlay product={detectedProduct} /> : null}

//       {!scanned && (
//         <View style={{ position: "absolute", bottom: 40, left: 0, right: 0, alignItems: "center" }}>
//           <Text style={{ color: "white", fontSize: 16 }}>Alineá el código dentro del marco</Text>
//           <ActivityIndicator style={{ marginTop: 8 }} />
//         </View>
//       )}
//     </View>
//   );
// }

// // screens/scan/ScanScreen.js
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import * as Haptics from "expo-haptics";

// // OCR + matcher (nuestro wrapper JS; si el nativo no está, devuelve [])
// import { recognize, matchProductByText } from "../../src/native/TextRecognizer";

// // ⚠️ Usa la ruta REAL donde guardaste tu JSON.
// // Según tus capturas, está en assets/data/products.json
// import rawProducts from "../../assets/data/products.json";

// // Normalizamos claves en español/inglés y palabras clave
// const CATALOG = rawProducts.map((p) => ({
//   ...p,
//   brand: p.brand ?? p.marca ?? "",
//   name: p.name ?? p.nombre ?? "",
//   keywords: p.keywords ?? p.claims ?? [],
// }));

// export default function ScanScreen({ navigation }) {
//   const camRef = useRef(null);

//   // Permisos
//   const [permission, requestPermission] = useCameraPermissions();
//   const [isReady, setIsReady] = useState(false);

//   // Estado UI
//   const [busy, setBusy] = useState(false);
//   const [message, setMessage] = useState("Alineá la etiqueta dentro del marco");
//   const [lastText, setLastText] = useState("");
//   const [detectedProduct, setDetectedProduct] = useState(null);

//   // Pide permisos al montar
//   useEffect(() => {
//     (async () => {
//       if (!permission || !permission.granted) {
//         await requestPermission();
//       }
//       setIsReady(true);
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const doScan = useCallback(async () => {
//     if (busy || !camRef.current) return;
//     setBusy(true);
//     setMessage("Analizando…");

//     try {
//       // Foto rápida con base64 para pasar al reconocedor
//       const photo = await camRef.current.takePictureAsync({
//            base64: true,
//           quality: 0.7,          // un poco más nítido
//          exif: false,
//         skipProcessing: false, // que iOS aplique orientación
//        });

//       const lines = await recognize(photo.base64); // ← devuelve array de líneas o []
//       const textPreview = Array.isArray(lines) ? lines.slice(0, 4).join(" · ") : String(lines || "");
//       setLastText(textPreview);

//       const product = matchProductByText(lines, CATALOG); // ← buscador difuso (Jaccard)
//       if (product) {
//         setDetectedProduct(product);
//         setMessage("¡Producto encontrado!");
//         await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

//         // Si querés navegar automáticamente al detalle, descomentá:
//         // navigation.navigate("ProductDetails", { product });
//       } else {
//         setDetectedProduct(null);
//         setMessage("No se reconoció el producto. Probá acercarte o centrar mejor.");
//         await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//       }
//     } catch (e) {
//       setDetectedProduct(null);
//       setMessage("Error al analizar la imagen.");
//     } finally {
//       setBusy(false);
//     }
//   }, [busy, navigation]);

//   if (!isReady || !permission) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator />
//         <Text style={styles.note}>Preparando cámara…</Text>
//       </View>
//     );
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.title}>Se requiere permiso de cámara</Text>
//         <TouchableOpacity style={styles.btn} onPress={requestPermission}>
//           <Text style={styles.btnText}>Conceder permiso</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView
//         ref={camRef}
//         facing="back"
//         style={StyleSheet.absoluteFill}
//         enableZoomGesture
//       />

//       {/* Marco/retícula simple */}
//       <View pointerEvents="none" style={styles.reticle} />

//       {/* Panel AR con info básica cuando hay match */}
//       {detectedProduct ? (
//         <View style={styles.infoCard}>
//           <Text style={styles.productName}>
//             {detectedProduct.brand} — {detectedProduct.name || detectedProduct.nombre}
//           </Text>

//           {/* Resumen mínimo (adaptado a tus claves) */}
//           {detectedProduct.tablaResumida && (
//             <Text style={styles.sub}>
//               {`Calorías: ${detectedProduct.tablaResumida.calorias} · Azúcares: ${detectedProduct.tablaResumida.azucares} · Prot.: ${detectedProduct.tablaResumida.proteinas}`}
//             </Text>
//           )}

//           {Array.isArray(detectedProduct.sellos) && detectedProduct.sellos.length > 0 && (
//             <Text style={styles.warn}>Sellos: {detectedProduct.sellos.join(" · ")}</Text>
//           )}
//         </View>
//       ) : null}

//       {/* Overlay de estado y diagnóstico del OCR */}
//       <View style={styles.bottomBar}>
//         <Text style={styles.status}>{message}</Text>
//         {!!lastText && <Text style={styles.ocrPreview}>{lastText}</Text>}

//         <TouchableOpacity
//           style={[styles.btn, busy && { opacity: 0.6 }]}
//           onPress={doScan}
//           disabled={busy}
//         >
//           <Text style={styles.btnText}>{busy ? "Analizando…" : "Escanear"}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// /* ==== Estilos ==== */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000" },
//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//     backgroundColor: "#000",
//   },
//   title: { color: "#fff", fontSize: 18, marginBottom: 12, textAlign: "center" },
//   note: { color: "#bbb", marginTop: 12 },
//   reticle: {
//     position: "absolute",
//     left: 24,
//     right: 24,
//     top: "22%",
//     height: "36%",
//     borderWidth: 2,
//     borderColor: "rgba(255,255,255,0.8)",
//     borderRadius: 16,
//   },
//   infoCard: {
//     position: "absolute",
//     top: 32,
//     left: 16,
//     right: 16,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     padding: 12,
//     borderRadius: 12,
//   },
//   productName: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   sub: { color: "#ddd", marginTop: 6, fontSize: 13 },
//   warn: { color: "#ffcd4d", marginTop: 6, fontSize: 13 },
//   bottomBar: {
//     position: "absolute",
//     bottom: 18,
//     left: 12,
//     right: 12,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     borderRadius: 12,
//     padding: 12,
//   },
//   status: { color: "#fff", fontSize: 14, marginBottom: 6 },
//   ocrPreview: { color: "#ccc", fontSize: 12, marginBottom: 10 },
//   btn: {
//     alignSelf: "center",
//     backgroundColor: "#3d82ff",
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//   },
//   btnText: { color: "#fff", fontWeight: "600" },
// });

// screens/scan/ScanScreen.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";

import { recognize, matchProductByText } from "../../src/native/TextRecognizer";
import products from "../../assets/data/products.json";

const SCAN_INTERVAL_MS = 1200;
const MATCH_OPTS = { threshold: 0.10, minHits: 2 };
const FRAME_ASPECT = 1.2;

export default function ScanScreen() {
  const camRef = useRef(null);
  const busyRef = useRef(false);
  const timerRef = useRef(null);
  const cameraReadyRef = useRef(false);

  const [permission, requestPermission] = useCameraPermissions();

  // UI
  const [message, setMessage] = useState("Alineá la etiqueta dentro del marco");
  const [detectedProduct, setDetectedProduct] = useState(null);
  const [spinning, setSpinning] = useState(false);

  // Debug SIEMPRE visible
  const [dbg, setDbg] = useState({
    phase: "INIT", // INIT | READY | SNAP | OCR | MATCH | ERROR
    tokens: 0,
    hits: "—",
    score: "0.000",
    err: "",
    snaps: 0, // cuántas fotos se intentaron
  });

  // pedir permisos
  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        await requestPermission();
      }
    })();
  }, []);

  // arranque/parada del scan loop
  useEffect(() => {
    if (!permission?.granted || !cameraReadyRef.current) return;

    // arrancar loop sólo cuando cámara está lista
    setDbg((d) => ({ ...d, phase: "READY", err: "" }));
    timerRef.current = setInterval(tick, SCAN_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [permission?.granted]);

  // se llama cada vez
  const tick = useCallback(async () => {
    if (!camRef.current || busyRef.current) return;

    try {
      busyRef.current = true;
      setSpinning(true);
      setDbg((d) => ({ ...d, phase: "SNAP", snaps: d.snaps + 1, err: "" }));

      const shot = await camRef.current.takePictureAsync({
        base64: true,
        quality: Platform.OS === "ios" ? 0.45 : 0.5,
        skipProcessing: true,
        exif: false,
      });

      if (!shot?.base64) {
        throw new Error("No base64 de la cámara");
      }

      setDbg((d) => ({ ...d, phase: "OCR" }));
      const lines = await recognize(shot.base64);

      const tokens = Array.isArray(lines)
        ? lines.join(" ").split(/\s+/).filter(Boolean).length
        : 0;

      setDbg((d) => ({ ...d, tokens }));

      const { product, score, hits } = matchProductByText(lines, products, MATCH_OPTS);

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
      } else {
        setDetectedProduct(null);
        setMessage("Alineá la etiqueta dentro del marco");
      }
    } catch (e) {
      setDetectedProduct(null);
      setMessage("Alineá la etiqueta dentro del marco");
      setDbg((d) => ({
        ...d,
        phase: "ERROR",
        err: e?.message || String(e),
      }));
    } finally {
      setSpinning(false);
      busyRef.current = false;
    }
  }, []);

  const onCameraReady = useCallback(() => {
    cameraReadyRef.current = true;
    setDbg((d) => ({ ...d, phase: "READY", err: "" }));
    // si los permisos ya estaban OK, (re)arrancá el loop
    if (permission?.granted && !timerRef.current) {
      timerRef.current = setInterval(tick, SCAN_INTERVAL_MS);
    }
  }, [permission?.granted, tick]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.note}>Solicitando cámara…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Se necesita acceso a la cámara</Text>
        <Text style={styles.note}>Habilitalo en Configuración para continuar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={camRef}
        style={StyleSheet.absoluteFill}
        facing="back"
        mode="picture"              // IMPORTANTE para takePictureAsync
        onCameraReady={onCameraReady}
        videoStabilizationMode="auto"
        zoom={0}
      />

      {!!message && (
        <View style={styles.topBanner}>
          <Text style={styles.topBannerText}>{message}</Text>
        </View>
      )}

      <View pointerEvents="none" style={styles.frameWrapper}>
        <View style={styles.frame} />
      </View>

      {detectedProduct && (
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
          {detectedProduct.nutrienteClave?.tipo && detectedProduct.nutrienteClave?.valor && (
            <Text style={styles.productMeta}>
              {detectedProduct.nutrienteClave.tipo}: {detectedProduct.nutrienteClave.valor}
            </Text>
          )}
        </View>
      )}

      {/* Debug SIEMPRE visible (abajo-izq)
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
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
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
  productTitle: { color: "#fff", fontWeight: "700", fontSize: 16, marginBottom: 6 },
  productSeals: { color: "#f8d477", fontSize: 14, marginBottom: 2 },
  productMeta: { color: "#cfe8ff", fontSize: 13 },

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
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
});
