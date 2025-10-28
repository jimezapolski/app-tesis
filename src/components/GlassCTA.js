// src/components/GlassCTA.js  
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GlassCTA({ title = "Comenzar", onPress, width = 250, height = 50 }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1.0 }]}>
      <View style={[styles.wrap, { width, height, borderRadius: 14 }]}>
        
        {/* Gradiente Figma: #FFFFFF 28% → #FFFFFF 60% */}
        <LinearGradient
          colors={["rgba(255,255,255,0.28)", "rgba(255,255,255,0.60)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 14 }]}
        />
        {/* Stroke “Inside 1px” (simulación) */}
        <View style={[StyleSheet.absoluteFill, { borderRadius: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.8)" }]} />
        {/* Drop shadow blanco (como Figma: y:10, blur:20, 24%) */}
        <View style={styles.shadow} pointerEvents="none" />
        <Text style={styles.label}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  label: {
    color: "#1B1B1B",
    fontSize: 16,
    fontWeight: "600",
  },
  shadow: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.24,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    // Android fallback
    elevation: 8,
  },
});
