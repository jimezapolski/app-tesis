// import React from "react";
// import {
//   Pressable,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   View,
// } from "react-native";
// import * as Notifications from "expo-notifications";
// import { notifyNow } from "../../src/notifications/notify";

// export default function NotifyTestButton() {
//   async function onMotivarAhora() {
//     const id = await notifyNow(
//       "Cada elección cuenta",
//       "Hoy diste un paso hacia una mejor alimentación."
//     );
//     if (!id) {
//       await Notifications.presentNotificationAsync({
//         title: "Cada elección cuenta",
//         body: "Hoy diste un paso hacia una mejor alimentación.",
//       });
//     }
//   }

//   return (
//     <Pressable onPress={onMotivarAhora} style={styles.pressable}>
//   <ImageBackground
//     source={require("../../assets/bg-btn-stars.png")}
//     resizeMode="contain"
//     style={styles.imageBackground}
//     imageStyle={styles.image}
//   >
//     {/* centrado absoluto */}
//     <View style={styles.iconContainer}>
//       <Text style={styles.btnText}>✨</Text>
//     </View>
//   </ImageBackground>
// </Pressable>
//   );
// } 

// const styles = StyleSheet.create({
//   pressable: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#608EC6",
//     shadowOpacity: 0.35,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   imageBackground: {
//     width: 64,
//     height: 64,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
//   image: {
//     borderRadius: 32,
//   },
//   iconContainer: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: [{ translateX: -14 }, { translateY: -16 }], // 🔹ajuste fino del centro
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   btnText: {
//     fontSize: 22,
//     color: "#fff",
//     textAlign: "center",
//   },
// });

import React, { useRef, useState } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import { notifyNow } from "../../src/notifications/notify";

const POOL = [
  { title: "🤝 Sin juicios", body: "La información te acompaña: elegí a tu ritmo." },
  { title: "🧠 Elegí con calma", body: "Un minuto para leer te evita compras impulsivas." },
  { title: "⭐️ Progresar, no perfeccionar", body: "Cada pequeño cambio sostenido construye un gran avance." },
  { title: "💬 Escuchate", body: "Tus elecciones también hablan de cómo te sentís hoy." },
  { title: "🌿 Cuidarte no es restringirte", body: "Es aprender a elegir lo que te hace bien." },
  { title: "🪞 Mirá tu propio proceso", body: "Compararte menos, entenderte más." },
  { title: "💫 Pequeños pasos", body: "Tu bienestar se construye día a día, sin apuro." },
  { title: "🙌🏼 Cada elección cuenta", body: "Informarte también es una forma de autocuidado." },
  { title: "🌈 Aprender sin culpa", body: "Conocer los alimentos te da libertad, no rigidez." },
  { title: "📖 Entender antes de decidir", body: "La información te da poder, no obligación." },
  { title: "🏅 Celebrá tus avances", body: "Notar tus mejoras también alimenta tu bienestar." },
  { title: "🍔 Flexible es mejor", body: "Comer bien no es perfecto, es equilibrado." },
  { title: "🪶 Ligero no es poco", body: "Elegir simple también es cuidar tu energía." },
  { title: "✨ Conocé sin miedo", body: "Saber qué comés te empodera, no te limita." },
  { title: "☯️ Tu punto medio", body: "Entre lo ideal y lo posible, elegí lo que podés sostener." },
];


function pickRandomDifferent(lastIndexRef) {
  let idx = Math.floor(Math.random() * POOL.length);
  if (lastIndexRef.current === idx) {
    idx = (idx + 1) % POOL.length;
  }
  lastIndexRef.current = idx;
  return POOL[idx];
}

export default function NotifyTestButton() {
  const lastIndexRef = useRef(-1);
  const [busy, setBusy] = useState(false);

  async function onMotivarAhora() {
    if (busy) return;
    setBusy(true);
    try {
      const { title, body } = pickRandomDifferent(lastIndexRef);
      const id = await notifyNow(title, body);
      if (!id) {
        await Notifications.presentNotificationAsync({ title, body });
      }
    } catch (error) {
      console.log("Error enviando notificación:", error);
    } finally {
      setTimeout(() => setBusy(false), 600); // anti doble tap
    }
  }

  return (
    <Pressable onPress={onMotivarAhora} style={styles.pressable}>
      <ImageBackground
        source={require("../../assets/bg-btn-stars.png")}
        resizeMode="contain"
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.btnText}>✨</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const SIZE = 64;

const styles = StyleSheet.create({
  pressable: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#608EC6",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  imageBackground: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: { borderRadius: SIZE / 2 },
  iconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -13 }, { translateY: -15 }],
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { fontSize: 22, color: "#fff", textAlign: "center" },
});
