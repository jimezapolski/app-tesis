// src/components/ProductCards.jsx
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  FlatList,
  Pressable,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { explainSeals } from "../../src/utils/seals";

/* ---------- helpers ---------- */
const KIND_COLORS = {
  positivo:  "#FFFFFF",
  recomendacion: "#FFFFFF",
  alerta: "#FAFAFA",
  sello:  "#FFFFFF",
};
const W = Dimensions.get("window").width;

function oneLiner(text, max = 400) {
  const t = (text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const safe = cut.slice(0, cut.lastIndexOf(" "));
  return (safe || cut).trim() + "…";
}

function normalizeCards(raw) {
  const list = [];
  if (!raw) return list;
  const pushIf = (val, card) => {
    if (val && String(val).trim().length > 0)
      list.push({ ...card, text: String(val).trim() });
  };
  pushIf(raw.positivo, {
    kind: "positivo",
    title: "Punto positivo",
    icon: "✨",
  });
  pushIf(raw.recomendacion, {
    kind: "recomendacion",
    title: "Recomendación",
    icon: "📌",
  });
  pushIf(raw.alerta, {
    kind: "alerta",
    title: "A tener en cuenta",
    icon: "⚠️",
  });
  return list;
}
function dedupeCards(arr) {
  const seen = new Set();
  return (arr || []).filter((c) => {
    const sig = `${c.kind}::${(c.title || "").toLowerCase().trim()}::${(
      c.text || ""
    )
      .toLowerCase()
      .trim()}`;
    if (seen.has(sig)) return false;
    seen.add(sig);
    return true;
  });
}

function useTilt(enable = false) {
  const ax = React.useRef(new Animated.Value(0)).current;
  const ay = React.useRef(new Animated.Value(0)).current;
  // cuando lo actives, metemos el import dinámico acá
  return { ax, ay, enable };
}

/* ---------- liquid card ---------- */
function LiquidCard({ item, isDark, onPress, enableTilt = false, style }) {
  const { ax, ay } = useTilt(enableTilt);
  const rotateY = ax.interpolate({ inputRange: [-1, 1], outputRange: ["0deg", "0deg"] });
  const rotateX = ay.interpolate({ inputRange: [-1, 1], outputRange: ["0deg", "0deg"] });

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        style,
        { transform: [{ perspective: 600 }, { rotateX }, { rotateY }] },
      ]}
    >
      {/* 1) Blur cubriendo TODA la card */}
      <BlurView
        intensity={95}
        tint={isDark ? "dark" : "light"}
        style={styles.blurLayer}
        experimentalBlurMethod="dimezisBlurView"
      />

      {/* 2) Tinte lechoso encima del blur (para “liquid glass”) */}
      <View style={styles.glassTint} />

      {/* 3) Highlight superior */}
      <View style={styles.topHighlight} />

      {/* 4) Contenido */}
      <Pressable onPress={onPress} style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.9 : 1 }]}>
        <View style={styles.content}>
          <Text style={[styles.titleRow, { color: "#FFFFFF" }]}>
            <Text style={[styles.titleColor, { color: item.color }]}>
              {item.icon} {item.title}
            </Text>
          </Text>
          <Text style={styles.bodyText}>{item.text}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

/* ---------- componente principal ---------- */
export default function ProductCards({ product, cards: cardsProp, onClose }) {
  const scheme = useColorScheme();
  const isDark = scheme !== "light";
  const insets = useSafeAreaInsets();
  const cards = useMemo(() => {
    // Soporta data prearmada (cardsProp) o product.cards
    let base = [];
    if (Array.isArray(cardsProp)) {
      base = cardsProp.filter(Boolean).map((c) => ({
        kind: c.kind,
        title: c.title || (c.kind === "alerta" ? "A tener en cuenta" : c.kind),
        icon: c.icon || "•",
        text: c.text || "",
      }));
    } else {
      base = normalizeCards(product?.cards);
    }

    // Auto sello
    const extra = [];
    const selloText = explainSeals?.(product);
    if (selloText && selloText.trim().length > 0) {
      extra.push({
        kind: "sello",
        title: "¿Por qué este sello?",
        icon: "🏷️",
        text: selloText.trim(),
      });
    }

    const all = dedupeCards([...base, ...extra]).map((c) => ({
      ...c,
      color: KIND_COLORS[c.kind] || "#FFFFFF",
      summary: c.text,
    }));

    return all;
  }, [product, cardsProp]);

  if (!cards.length) {
    // Debug: mostramos una pista para validar el flujo
    return (
      <View
        style={[styles.stripRoot, { justifyContent: "flex-end" }]}
        pointerEvents="box-none"
      >
        <View
          style={[
            styles.stripOverlay,
            {
              backgroundColor: isDark
                ? "rgba(10,10,12,0.45)"
                : "rgba(12,12,14,0.35)",
            },
          ]}
        />
        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          <Text style={{ color: "#fff", opacity: 0.7, textAlign: "center" }}>
            (No hay cards para este producto)
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
    pointerEvents="box-none"
    style={[
      styles.stripRoot,
      { bottom: (insets?.bottom ?? 0) + 8 } 
    ]}
  >
      <View
        style={[
          styles.stripOverlay,
          {
            backgroundColor: isDark
              ? "rgba(10,10,12,0.45)"
              : "rgba(12,12,14,0.35)",
          },
        ]}
      />
      <FlatList
        data={cards}
        horizontal
        keyExtractor={(it, i) => `${it.kind}-${i}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.list,
          { paddingLeft: SPACING, paddingRight: SPACING + PEEK },
        ]}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={CARD_W + GUTTER}
        getItemLayout={(data, index) => ({
          length: CARD_W + GUTTER,
          offset: (CARD_W + GUTTER) * index,
          index,
        })}
        renderItem={({ item, index }) => (
          <LiquidCard
            item={item}
            isDark={isDark}
            enableTilt={false}
            style={{ width: CARD_W, marginRight: GUTTER }}
            onPress={() => {}}
          />
        )}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: CARD_H,
          width: 24,
          backgroundColor: "rgba(0,0,0,0.0001)",
        }}
        pointerEvents="none"
      />
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          height: CARD_H,
          width: PEEK,
          backgroundColor: "rgba(0,0,0,0.0001)",
        }}
        pointerEvents="none"
      />
      {/* {onClose ? (
        <Pressable onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeTxt}>Cerrar</Text>
        </Pressable>
      ) : null} */}
    </View>
  );
}

/* ---------- estilos ---------- */
const SPACING = 16;
const PEEK = 28;
const GUTTER = 12;
const CARD_H = 130;
const CARD_W = Math.round(W - (SPACING * 2 + PEEK));
const styles = StyleSheet.create({
  stripRoot: {
    
    position: "absolute",     // 👈 vuelve a ser flotante
 left: 0,                  // 👈 ocupa ancho completo
    right: 0,
  // bottom lo seteamos dinámicamente con insets en el JSX
  minHeight: CARD_H + 24,
    maxHeight: Math.round(Dimensions.get("window").height * 0.2),
   justifyContent: "flex-end",
  zIndex: 1000,
 pointerEvents: "box-none",
      },
      stripOverlay: {
      // ...StyleSheet.absoluteFillObject,
      // opcional: si querés scrim, activá absoluteFill
      // ...StyleSheet.absoluteFillObject,
      },

  cardWrapper: {
    width: CARD_W,
    minHeight: CARD_H,
    paddingVertical: 14,
    borderRadius: 22,
    overflow: "hidden",                        // recorta todo a la curva
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.37)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    backgroundColor: "transparent",            // ⭐ nada de fondo acá
  },

  // El blur debe cubrir el 100% del contenedor
  blurLayer: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 22,                           // iOS a veces lo necesita igual
  },

  // Tinte lechoso (antes lo tenías en blurLayer)
  glassTint: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.14)", // ajustá 0.14–0.22 a gusto
  },

  topHighlight: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  content: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: "center",
  },

  titleRow: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowRadius: 2,
  },
  titleColor: { fontWeight: "900" },
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowRadius: 2,
    flexShrink: 1,
    flexWrap: "wrap",
    width: "100%",
  },
});
