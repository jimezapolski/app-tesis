import React from "react";
import { View, Text } from "react-native";
import { band, bandColor, humanBand, levels } from "../utils/nutrition";

export default function ARInfoOverlay({ product }) {
  if (!product) return null;

  const sugarB = band(product?.nutrition?.sugar_g_per_100g, levels.sugar);
  const saltB  = band(product?.nutrition?.salt_g_per_100g,  levels.salt);
  const fatB   = band(product?.nutrition?.fat_g_per_100g,   levels.fat);
  const allergens = product?.allergens || [];

  const Chip = ({ children, badge }) => (
    <View style={{
      paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14,
      backgroundColor: badge ? bandColor(badge) : "rgba(0,0,0,0.35)",
      marginRight: 8, marginBottom: 8
    }}>
      <Text style={{ color: "#fff", fontWeight: "700" }}>{children}</Text>
    </View>
  );

  return (
    <>
      {/* Marco guía */}
      <View style={{
        position: "absolute", left: 24, right: 24, top: 140, height: 220,
        borderWidth: 3, borderRadius: 14, borderColor: "rgba(255,255,255,0.9)"
      }}/>

      {/* Chips arriba */}
      <View style={{
        position: "absolute", top: 32, left: 16, right: 16,
        flexDirection: "row", flexWrap: "wrap"
      }}>
        <Chip badge={sugarB}>Azúcar {humanBand(sugarB) || "-"}</Chip>
        <Chip badge={saltB}>Sodio {humanBand(saltB) || "-"}</Chip>
        <Chip badge={fatB}>Grasas {humanBand(fatB) || "-"}</Chip>
        {allergens.slice(0,3).map(a => <Chip key={a}>Alérgeno: {a}</Chip>)}
        {product?.ultraProcessed ? <Chip>Ultra-procesado</Chip> : null}
      </View>

      {/* Tarjeta abajo */}
      <View style={{
        position: "absolute", left: 12, right: 12, bottom: 24,
        backgroundColor: "rgba(0,0,0,0.75)", padding: 14, borderRadius: 16
      }}>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800" }}>
          {product.brand ? `${product.brand} · ` : ""}{product.name}
        </Text>
        {product?.claims?.length ? (
          <Text style={{ color: "#ddd", marginTop: 6 }}>{product.claims.join(" · ")}</Text>
        ) : null}
        {product?.ingredients ? (
          <Text numberOfLines={2} style={{ color: "#aaa", marginTop: 6 }}>
            Ingredientes: {product.ingredients}
          </Text>
        ) : null}
      </View>
    </>
  );
}
