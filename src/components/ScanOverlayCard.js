// src/components/ScanOverlayCard.js
import React from "react";
import { View, Text, Pressable } from "react-native";

export default function ScanOverlayCard({ product = {}, onPressMore, onClose }) {
  const {
    name = "Producto",
    brand = "",
    seals = [],
    positive_ingredients = [],
    nutrients_per_portion = {},
  } = product;

  const { proteinas_g, azucares_g, grasas_saturadas_g, calorias_kcal, portion } =
    nutrients_per_portion || {};

  return (
    <View style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      padding: 16, backgroundColor: "rgba(0,0,0,0.78)"
    }}>
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
        {name}{brand ? ` — ${brand}` : ""}
      </Text>

      {!!seals?.length && (
        <>
          <Text style={{ color: "#bdbdbd", marginTop: 8 }}>Sellos:</Text>
          <Text style={{ color: "#fff" }}>{seals.join(", ")}</Text>
        </>
      )}

      {!!positive_ingredients?.length && (
        <>
          <Text style={{ color: "#bdbdbd", marginTop: 8 }}>Ingrediente positivo:</Text>
          <Text style={{ color: "#fff" }}>{positive_ingredients.join(", ")}</Text>
        </>
      )}

      {proteinas_g != null && (
        <Text style={{ color: "#fff", marginTop: 4 }}>
          Proteínas: {proteinas_g} g{portion ? `/ ${portion}` : ""}
        </Text>
      )}

      <View style={{ flexDirection: "row", marginTop: 14, gap: 16 }}>
        <Pressable
          onPress={onPressMore}
          style={{ backgroundColor: "#2e7d32", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Ver más</Text>
        </Pressable>
        <Pressable
          onPress={onClose}
          style={{ backgroundColor: "rgba(255,255,255,0.12)", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 }}
        >
          <Text style={{ color: "#fff" }}>Cerrar</Text>
        </Pressable>
      </View>
    </View>
  );
}
