
// screens/scan/ScanScreen.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import ProductCards from "../../src/components/ProductCards";


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

      {/* {detectedProduct && (
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
      )} */}
      {/* Overlay de cards cuando hay match */}
    {detectedProduct && (
      <ProductCards
        product={detectedProduct}
        onClose={() => setDetectedProduct(null)}
      />
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
