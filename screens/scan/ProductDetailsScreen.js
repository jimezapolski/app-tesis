// screens/scan/ProductDetailsScreen.js
import React, { useEffect, useState } from "react";
import { ScrollView, Text, ActivityIndicator, View, Image } from "react-native";
import { getProductByBarcode } from "../../src/services/products";

// Normaliza el snapshot recibido por route (si lo hay)
function normalize(p) {
  if (!p) return null;
  return {
    barcode: String(p.barcode ?? p.codigo ?? p.codigo_barras ?? ""),
    nombre: p.nombre ?? p.name ?? "Producto",
    marca: p.marca ?? p.brand ?? "",
    foto: p.foto ?? p.image ?? null,
    // sellos puede venir como strings o como objetos { tipo, valor }
    sellos: Array.isArray(p.sellos) ? p.sellos : Array.isArray(p.seals) ? p.seals : [],
    ingredientesPositivos: p.ingredientesPositivos ?? p.positive_ingredients ?? [],
    nutrientes_por_porcion:
      p.nutrientes_por_porcion ??
      p.nutrients_per_portion ?? {
        portion: p.porcion ?? p.portion ?? "100 g",
        azucares_g: p.azucares_g ?? null,
        grasas_saturadas_g: p.grasas_saturadas_g ?? null,
        calorias_kcal: p.calorias_kcal ?? null,
        proteinas_g: p.proteinas_g ?? null,
      },
    nutrienteClave: p.nutrienteClave ?? p.highlight ?? null,
  };
}

// Convierte sello a texto seguro
function formatSeal(s) {
  if (typeof s === "string") return s;
  if (s && typeof s === "object") {
    const t = s.tipo ?? s.type ?? "";
    const v = s.valor ?? s.value ?? "";
    return [t, v].filter(Boolean).join(": ") || "[sello]";
  }
  return String(s ?? "");
}

// Etiquetas lindas para nutrientes
function prettyLabel(k) {
  const map = {
    portion: "Porción",
    azucares_g: "Azúcares (g)",
    grasas_saturadas_g: "Grasas saturadas (g)",
    calorias_kcal: "Calorías (kcal)",
    proteinas_g: "Proteínas (g)",
  };
  return map[k] ?? k;
}

export default function ProductDetailsScreen({ route }) {
  const { barcode, product: initialProduct } = route.params ?? {};
  const [product, setProduct] = useState(() => normalize(initialProduct));
  const [loading, setLoading] = useState(!initialProduct && !!barcode);

  useEffect(() => {
    let mounted = true;
    async function fetchProduct() {
      if (initialProduct || !barcode) return;
      setLoading(true);
      try {
        const found = await getProductByBarcode(String(barcode));
        if (mounted) setProduct(normalize(found));
      } catch {
        if (mounted) setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProduct();
    return () => { mounted = false; };
  }, [barcode, initialProduct]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:24 }}>
        <Text>No se encontró información para este producto.</Text>
        {!!barcode && <Text style={{ marginTop:8, color:"#555" }}>Código: {barcode}</Text>}
      </View>
    );
  }

  const sealsList = (product.sellos ?? []).map(formatSeal).filter(Boolean);
  const nutrientes = product.nutrientes_por_porcion ?? {};

  return (
    <ScrollView contentContainerStyle={{ padding:16 }}>
      <Text style={{ fontSize:18, fontWeight:"700", marginBottom:12 }}>
        {product.nombre || "—"}{product.marca ? ` — ${product.marca}` : ""}
      </Text>

      {!!product.foto && (
        <Image
          source={{ uri: product.foto }}
          style={{ width: "100%", height: 180, resizeMode: "contain", marginBottom: 12 }}
        />
      )}

      <Text style={{ fontSize:14, marginBottom:8 }}>
        Código: {product.barcode || barcode}
      </Text>

      {/* Sellos */}
      <View style={{ marginTop: 8, marginBottom: 8 }}>
        <Text style={{ fontSize:16, fontWeight:"700", marginBottom:6 }}>Sellos</Text>
        {sealsList.length ? (
          sealsList.map((s, i) => (
            <Text key={`${s}-${i}`} style={{ fontSize:14, color:"#333", marginBottom:2 }}>
              • {s}
            </Text>
          ))
        ) : (
          <Text style={{ fontSize:14, color:"#666" }}>Sin sellos</Text>
        )}
      </View>

      {/* Nutriente clave */}
      {product.nutrienteClave && (
        <View style={{ marginTop: 8, marginBottom: 8 }}>
          <Text style={{ fontSize:16, fontWeight:"700", marginBottom:6 }}>Nutriente clave</Text>
          <Text style={{ fontSize:14, color:"#333" }}>{String(product.nutrienteClave)}</Text>
        </View>
      )}

      {/* Ingredientes positivos */}
      <View style={{ marginTop: 8, marginBottom: 8 }}>
        <Text style={{ fontSize:16, fontWeight:"700", marginBottom:6 }}>Ingredientes positivos</Text>
        {(product.ingredientesPositivos ?? []).length ? (
          (product.ingredientesPositivos ?? []).map((ing, i) => (
            <Text key={`${String(ing)}-${i}`} style={{ fontSize:14, color:"#333", marginBottom:2 }}>
              • {String(ing)}
            </Text>
          ))
        ) : (
          <Text style={{ fontSize:14, color:"#666" }}>No informado</Text>
        )}
      </View>

      {/* Nutrientes por porción */}
      <View style={{ marginTop: 8, marginBottom: 16 }}>
        <Text style={{ fontSize:16, fontWeight:"700", marginBottom:6 }}>Nutrientes por porción</Text>
        {Object.keys(nutrientes).length ? (
          Object.entries(nutrientes).map(([k, v]) => (
            <Text key={k} style={{ fontSize:14, color:"#333", marginBottom:2 }}>
              {prettyLabel(k)}: {v == null ? "—" : String(v)}
            </Text>
          ))
        ) : (
          <Text style={{ fontSize:14, color:"#666" }}>No informado</Text>
        )}
      </View>
    </ScrollView>
  );
}
