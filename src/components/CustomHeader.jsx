// components/CustomHeader.jsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import { HOME } from "../../constants/theme";

export default function CustomHeader({ title = "", onBack }) {
  return (
    <View style={styles.headerWrap}>
      {/* Blur ancho completo, como en Home */}
      <BlurView
        intensity={28}
        tint="light"
        style={styles.blurBackground}
        pointerEvents="none"
      />

      {/* Contenido del header */}
      <View style={styles.container}>
        {/* Botón atrás */}
        <TouchableOpacity
          onPress={onBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.backWrapper}
        >
          <ImageBackground
            source={require("../../assets/glass-btn.png")}
            style={styles.backBg}
            imageStyle={{ borderRadius: 22 }}
            resizeMode="cover"
          >
            <Text style={styles.backIcon}>←</Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* Título */}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        {/* placeholder para centrar */}
        <View style={{ width: 44 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor general del header (similar al View del botón fijo)
  headerWrap: {
    width: "100%",
    // alto automático según padding, pero con fondo tipo “vidrio”
    backgroundColor: "rgba(255,255,255,0.18)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.45)",
    overflow: "hidden",
  },

  // Blur “pegado” al header, como glassFull pero solo en la franja de header
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  // Contenido (flecha + título)
  container: {
    paddingTop: Platform.OS === "ios" ? 54 : 24,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },

  backBg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 22,
    fontWeight: "600",
    color: "#608EC6",
    textAlign: "center",
    marginTop: -1,
  },

  title: {
    flex: 1,
    textAlign: "center",
    marginRight: 44,
    ...HOME.type.section20,
    fontSize: 18,
  },
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
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <ImageBackground
        source={require("../../assets/glass-btn.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ borderRadius: 10 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
