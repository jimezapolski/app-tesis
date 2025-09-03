// /screens/scan/ScanScreen.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, View, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";

// ⬇️ Ajustá estas rutas según tu estructura real
import { getProductByBarcode } from "../../src/services/products";
import ScanOverlayCard from "../../src/components/ScanOverlayCard";
import { useAutoSaveScan } from "../../src/hooks/useScanHistory";

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [ready, setReady] = useState(false);
  const [scanned, setScanned] = useState(false);

  // ✅ estado correcto
  const [detectedProduct, setDetectedProduct] = useState(null);

  const [message, setMessage] = useState("Alineá el código de barras dentro del marco");
  const lockRef = useRef(false);

  // Guarda automáticamente cada lectura válida en historial
  useAutoSaveScan({
    product: detectedProduct,   // 👈 usa el estado correcto
    enabled: true,
    cooldownMs: 5000,
  });

  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        await requestPermission();
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const resetState = useCallback(() => {
    setDetectedProduct(null); // 👈 antes llamaba a setProduct
    setScanned(false);
    lockRef.current = false;
    setMessage("Alineá el código de barras dentro del marco");
  }, []);

  const handleScanned = useCallback(
    async ({ data }) => {
      if (scanned || lockRef.current) return;
      lockRef.current = true;
      setScanned(true);
      setMessage("Buscando producto…");

      try {
        const found = await getProductByBarcode(String(data));

        if (Platform.OS !== "web") {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        setDetectedProduct(found); // 👈 antes setProduct
        setMessage("");
      } catch (e) {
        setMessage("Producto no encontrado");
        setTimeout(() => {
          setScanned(false);
          lockRef.current = false;
          setMessage("Alineá el código de barras dentro del marco");
        }, 1200);
      }
    },
    [scanned]
  );

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
          // Para pruebas de campo podés arrancar solo con EAN-13:
          // barcodeTypes: ["ean13"],
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128"],
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
              borderRadius: 8,
            }}
          >
            {message}
          </Text>
        </View>
      )}

      {detectedProduct && ( // 👈 usa detectedProduct
        <ScanOverlayCard
          product={detectedProduct}
          // Mejor navegar por barcode para mantener consistencia con HistoryScreen:
          onPressMore={() =>
            navigation.navigate("ProductDetails", {
              barcode: detectedProduct.barcode,
              product: {
                nombre: detectedProduct.nombre,
                marca: detectedProduct.marca,
                sellos: detectedProduct.sellos ?? [],
                nutrienteClave: detectedProduct.nutrienteClave ?? null,
                foto: detectedProduct.foto ?? null,
              },
            })
          }
          onClose={resetState}
        />
      )}

      {/* Marco guía */}
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
          borderRadius: 12,
        }}
      />
    </View>
  );
}
