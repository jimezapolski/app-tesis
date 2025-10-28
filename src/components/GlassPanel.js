// src/components/GlassPanel.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";


export default function GlassPanel({ children, radius = 24, intensity = 85, tint = "light", style }) {
  return (
    <View style={[styles.wrap, { borderRadius: radius }, style]}>
      <BlurView intensity={intensity} tint={tint} style={[StyleSheet.absoluteFill, { borderRadius: radius }]} />
      <View style={[StyleSheet.absoluteFill, { borderRadius: radius, backgroundColor: "rgba(255,255,255,0.16)" }]} />
      <View style={[styles.topHighlight, { borderTopLeftRadius: radius, borderTopRightRadius: radius }]} />
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    backgroundColor: "transparent",
  },
  body: { padding: 18 },
  topHighlight: { position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: "rgba(255,255,255,0.30)" },
});
