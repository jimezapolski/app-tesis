// src/components/CustomHeader.jsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import { HOME } from "../../constants/theme";


export default function CustomHeader({
  title = "",
  onBack,
  right = null,
  variant = "blur",
}) {
  const Container = ({ children }) =>
    variant === "blur" ? (
      <BlurView intensity={40} tint="light" style={styles.container}>
        {children}
      </BlurView>
    ) : (
      <View style={[styles.container, { backgroundColor: "transparent" }]}>
        {children}
      </View>
    );

  return (
    <Container>
      <View style={styles.inner}>
        {/* Back */}
        <TouchableOpacity
          onPress={onBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.backBtn}
        >
          <Image
            source={require("../../assets/icons/back-arrow.png")}
            style={styles.backIcon}
            onError={() => {}}
          />
          {/* <Text style={styles.backText}>‹</Text> */}
        </TouchableOpacity>

        {/* Título */}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        {/* Slot derecho */}
        <View style={styles.right}>{right}</View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 54 : 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  backBtn: { width: 40, height: 32, alignItems: "flex-start", justifyContent: "center" },
  backIcon: { width: 22, height: 22, tintColor: "#608EC6" },
  // backText: { fontSize: 28, color: "#608EC6", lineHeight: 28, marginTop: -2 },
  title: {
    flex: 1,
    textAlign: "center",
    marginRight: 40,
    ...HOME.type.quickTitle16,
    fontSize: 18,
  },
  right: { width: 40, alignItems: "flex-end" },
});

/* ============================================================
 * Botón minimal de “volver” con fondo glass (imagen PNG)
 * ============================================================ */

export function MinimalBackButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 60,
        height: 40,
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 16,
        marginTop: Platform.OS === "ios" ? 6 : 0,
        shadowColor: "#000",
        shadowOpacity: 0.10,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {/* Fondo glass por imagen */}
      <ImageBackground
        source={require("../../assets/glass-btn.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ borderRadius: 22 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Usá tu icono/back actual, o el símbolo ← como fallback */}
          {/* <Image source={require("../../assets/icons/chevron-left.png")} style={{ width: 18, height: 18, tintColor: "#608EC6" }} /> */}
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: "600",
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            ←
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
