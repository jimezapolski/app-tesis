// import React, { useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   Animated,
//   useColorScheme,
//   StyleSheet,
//   ScrollView,
// } from "react-native";

// /**
//  * Muestra 1–3 tarjetas educativas para el producto reconocido.
//  * Espera product.cards = { positivo?: string, recomendacion?: string, alerta?: string }
//  */
// export default function ProductCards({ product, onClose }) {
//   const theme = useColorScheme();
//   const appear = useRef(new Animated.Value(0)).current;

//   // animación de entrada
//   useEffect(() => {
//     Animated.spring(appear, {
//       toValue: 1,
//       useNativeDriver: true,
//       damping: 12,
//       stiffness: 180,
//       mass: 0.9,
//     }).start();
//   }, [appear]);

//   if (!product) return null;

//   const cards = normalizeCards(product?.cards);

//   if (cards.length === 0) return null;

//   const isDark = theme === "dark";

//   return (
//     <Animated.View
//       accessibilityRole="summary"
//       style={[
//         styles.container,
//         {
//           transform: [
//             {
//               translateY: appear.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [40, 0],
//               }),
//             },
//           ],
//           opacity: appear,
//         },
//       ]}
//     >
//       {/* Encabezado compacto */}
//       <View style={styles.headerRow}>
//         <Text
//           style={[
//             styles.title,
//             { color: isDark ? "#F6F7F9" : "#1A1D21" },
//           ]}
//           numberOfLines={1}
//         >
//           {product?.nombre || product?.name || "Producto"}
//         </Text>

//         {onClose && (
//           <Pressable
//             onPress={onClose}
//             accessibilityRole="button"
//             accessibilityLabel="Cerrar tarjetas"
//             hitSlop={12}
//           >
//             <Text style={[styles.close, { color: isDark ? "#C6CBD3" : "#64748B" }]}>
//               ✕
//             </Text>
//           </Pressable>
//         )}
//       </View>

//       {/* Cards horizontales (scroll si son 3) */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingRight: 8 }}
//       >
//         {cards.map((c, i) => (
//           <View
//             key={i}
//             style={[
//               styles.card,
//               c.kind === "positivo" && styles.cardPositive,
//               c.kind === "recomendacion" && styles.cardNeutral,
//               c.kind === "alerta" && styles.cardWarning,
//               {
//                 backgroundColor:
//                   c.kind === "positivo"
//                     ? (isDark ? "#0E2C1D" : "#E9F8F0")
//                     : c.kind === "recomendacion"
//                     ? (isDark ? "#0F1E2E" : "#E9F2FB")
//                     : (isDark ? "#2E150F" : "#FDEDE8"),
//                 borderColor:
//                   c.kind === "positivo"
//                     ? (isDark ? "#1BB378" : "#B6E9D1")
//                     : c.kind === "recomendacion"
//                     ? (isDark ? "#66A4F4" : "#B9D7FD")
//                     : (isDark ? "#F08A5B" : "#F9C7BA"),
//               },
//             ]}
//           >
//             <Text
//               style={[
//                 styles.cardLabel,
//                 {
//                   color:
//                     c.kind === "alerta"
//                       ? (isDark ? "#FFB59A" : "#C2410C")
//                       : c.kind === "positivo"
//                       ? (isDark ? "#6FE2B2" : "#116149")
//                       : (isDark ? "#9DC1FB" : "#1D4ED8"),
//                 },
//               ]}
//               accessibilityRole="header"
//             >
//               {c.icon} {c.title}
//             </Text>
//             <Text
//               style={[
//                 styles.cardText,
//                 { color: isDark ? "#E5E9F0" : "#0F172A" },
//               ]}
//             >
//               {c.text}
//             </Text>
//           </View>
//         ))}
//       </ScrollView>
//     </Animated.View>
//   );
// }

// /** Normaliza y ordena cards:
//  *  1) positivo   2) recomendacion   3) alerta
//  *  Si falta alguna y hay datos mínimos, intenta autocompletar.
//  */
// function normalizeCards(raw) {
//   const list = [];
//   if (!raw || typeof raw !== "object") return list;

//   if (raw.positivo) {
//     list.push({ kind: "positivo", title: "Punto positivo", icon: "✨", text: String(raw.positivo).trim() });
//   }
//   if (raw.recomendacion) {
//     list.push({ kind: "recomendacion", title: "Recomendación", icon: "💡", text: String(raw.recomendacion).trim() });
//   }
//   if (raw.alerta) {
//     list.push({ kind: "alerta", title: "A tener en cuenta", icon: "⚠️", text: String(raw.alerta).trim() });
//   }
//   return list;
// }

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     bottom: 20,
//     left: 12,
//     right: 12,
//     paddingVertical: 8,
//     paddingHorizontal: 8,
//     borderRadius: 16,
//     backgroundColor: "rgba(8,10,12,0.12)", // base translúcida sobre cámara
//     backdropFilter: "blur(4px)", // no en todos los RN; OK si se ignora
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//     paddingHorizontal: 4,
//   },
//   title: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   close: {
//     fontSize: 18,
//     paddingHorizontal: 6,
//   },
//   card: {
//     width: 260,
//     marginRight: 10,
//     borderRadius: 14,
//     padding: 12,
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOpacity: 0.12,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 3,
//   },
//   cardPositive: {},
//   cardNeutral: {},
//   cardWarning: {},
//   cardLabel: {
//     fontSize: 13,
//     fontWeight: "800",
//     letterSpacing: 0.2,
//     marginBottom: 6,
//     textTransform: "uppercase",
//   },
//   cardText: {
//     fontSize: 14.5,
//     lineHeight: 20,
//   },
// });

// src/components/ProductCards.jsx
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { explainSeals } from "../../src/utils/seals";

/* -------------------------------------------
   Normaliza las cards que vienen del JSON
-------------------------------------------- */
function normalizeCards(raw) {
  const list = [];
  if (!raw || typeof raw !== "object") return list;

  const pushIf = (cond, card) => {
    if (cond && card.text && String(card.text).trim().length > 0) {
      list.push({ ...card, text: String(card.text).trim() });
    }
  };

  pushIf(raw.positivo, {
    kind: "positivo",
    title: "Punto positivo",
    icon: "✨",
    text: raw.positivo,
  });

  pushIf(raw.recomendacion, {
    kind: "recomendacion",
    title: "Recomendación",
    icon: "📌",
    text: raw.recomendacion,
  });

  pushIf(raw.alerta, {
    kind: "alerta",
    title: "A tener en cuenta",
    icon: "⚠️",
    text: raw.alerta,
  });

  return list;
}

/* -------------------------------------------
   Evita duplicados
-------------------------------------------- */
function dedupeCards(arr) {
  const seen = new Set();
  return arr.filter((c) => {
    const sig = `${c.kind}::${(c.title || "").toLowerCase().trim()}::${(c.text || "")
      .toLowerCase()
      .trim()}`;
    if (seen.has(sig)) return false;
    seen.add(sig);
    return true;
  });
}

/* -------------------------------------------
   Tokens de color por tipo
-------------------------------------------- */
const KIND_COLORS = {
  positivo: "#4CAF50",
  recomendacion: "#3F8AE0",
  alerta: "#FFB300",
  sello: "#B0BEC5",
};

/* -------------------------------------------
   Card minimalista (glass-like)
-------------------------------------------- */
function MinimalCard({ icon, title, text, kind, isDark }) {
  const tint = KIND_COLORS[kind] || "#9AA0A6";

  return (
    <View
      style={[
        styles.card,
        isDark ? styles.cardDark : styles.cardLight,
        { borderColor: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.06)" },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconBadge, { backgroundColor: withAlpha(tint, 0.16) }]}>
          <Text style={[styles.iconEmoji, { color: tint }]}>{icon}</Text>
        </View>
        <Text style={[styles.title, { color: tint }]}>{title}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={[styles.body, isDark ? styles.bodyDark : styles.bodyLight]}>
        {text}
      </Text>
    </View>
  );
}

/* -------------------------------------------
   Componente principal
-------------------------------------------- */
export default function ProductCards({ product, onClose }) {
  const scheme = useColorScheme();
  const isDark = scheme !== "light";

  const cards = useMemo(() => {
    const base = normalizeCards(product?.cards);

    const extra = [];
    const selloText = explainSeals(product);
    if (selloText && selloText.trim().length > 0) {
      extra.push({
        kind: "sello",
        title: "¿Por qué este sello?",
        icon: "🏷️",
        text: selloText.trim(),
      });
    }

    return dedupeCards([...base, ...extra]);
  }, [product]);

  if (!cards.length) return null;

  return (
    <View style={styles.container} pointerEvents="box-none">
      {cards.map((c, idx) => (
        <MinimalCard key={`${c.kind}-${idx}`} {...c} isDark={isDark} />
      ))}

      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Text style={styles.closeTxt}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
}

/* -------------------------------------------
   Utils
-------------------------------------------- */
function withAlpha(hex, alpha = 0.2) {
  // hex "#RRGGBB"
  const a = Math.round(Math.min(Math.max(alpha, 0), 1) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}

/* -------------------------------------------
   Estilos (look & feel minimalista)
-------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
  },

  // Card base
  card: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    // Sombras suaves (iOS) + elevación (Android)
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    elevation: 6,
  },
  // Fondo translúcido cálido (light) y frío (dark)
  cardLight: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
  cardDark: {
    backgroundColor: "rgba(22,22,24,0.75)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  iconEmoji: { fontSize: 16 },
  title: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.14)",
    marginVertical: 10,
  },

  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  bodyLight: { color: "#111" },
  bodyDark: { color: "#ECECEC" },

  closeBtn: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.08)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginTop: 4,
  },
  closeTxt: { color: "#111", fontWeight: "600" },
});
