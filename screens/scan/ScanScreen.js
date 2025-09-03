import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, View, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera"; // 👈 cambio
import * as Haptics from "expo-haptics";
import { getProductByBarcode } from "../../src/services/products";
import ScanOverlayCard from "../../src/components/ScanOverlayCard";

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions(); // 👈 cambio
  const [ready, setReady] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("Alineá el código de barras dentro del marco");
  const lockRef = useRef(false);

  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        await requestPermission();
      }
    })();
  }, []);

  const resetState = useCallback(() => {
    setProduct(null);
    setScanned(false);
    lockRef.current = false;
    setMessage("Alineá el código de barras dentro del marco");
  }, []);

  const handleScanned = useCallback(async ({ data }) => {
    if (scanned || lockRef.current) return;
    lockRef.current = true;
    setScanned(true);
    setMessage("Buscando producto…");

    try {
      const found = await getProductByBarcode(String(data));
      if (Platform.OS !== "web") {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      setProduct(found);
      setMessage("");
    } catch {
      setMessage("Producto no encontrado");
      setTimeout(() => {
        setScanned(false);
        lockRef.current = false;
        setMessage("Alineá el código de barras dentro del marco");
      }, 1200);
    }
  }, [scanned]);

  if (!permission) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text style={{ textAlign: "center", marginBottom: 12 }}>
          Necesitamos permiso de cámara para escanear productos.
        </Text>
        <Text onPress={requestPermission} style={{ color: "#2e7d32", fontWeight: "600" }}>
          Otorgar permiso
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onCameraReady={() => setReady(true)}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128"]
        }}
        onBarcodeScanned={({ data }) => {
          if (!ready) return;
          handleScanned({ data });
        }}
      />

      {!!message && (
        <View style={{ position: "absolute", top: 40, left: 0, right: 0, alignItems: "center" }}>
          <Text
            style={{
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "#fff",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 8
            }}
          >
            {message}
          </Text>
        </View>
      )}

      {product && (
        <ScanOverlayCard
          product={product}
          onPressMore={() => navigation.navigate("ProductDetails", { product })}
          onClose={resetState}
        />
      )}

      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          top: "30%",
          bottom: "30%",
          borderColor: "rgba(255,255,255,0.6)",
          borderWidth: 2,
          borderRadius: 12
        }}
      />
    </View>
  );
}
