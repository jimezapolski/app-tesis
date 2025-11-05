import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { notifyNow, notifyAt } from "../../src/notifications/notify";

export default function NotificationDebug() {
  const [status, setStatus] = useState("desconocido");

  useEffect(() => {
    const sub1 = Notifications.addNotificationReceivedListener((n) => {
      console.log("🔔 RECIBIDA (foreground):", n);
    });
    const sub2 = Notifications.addNotificationResponseReceivedListener((r) => {
      console.log("👉 TOCADA (response):", r);
    });
    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, []);

  async function presentNowDirect() {
    try {
      const id = await Notifications.presentNotificationAsync({
        title: "🎯 Present direct",
        body: "Usa presentNotificationAsync (sin schedule)",
      });
      Alert.alert("presentNotificationAsync id", String(id));
    } catch (e) {
      Alert.alert("Error present", String(e));
    }
  }

  async function schedule3sDirect() {
    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: { title: "⏱️ 3s direct", body: "scheduleNotificationAsync directo" },
        trigger: { seconds: 3 },
      });
      Alert.alert("schedule id", String(id));
    } catch (e) {
      Alert.alert("Error schedule", String(e));
    }
  }

  // ...deja los otros botones que ya tenés (ver permisos, solicitar, notifyNow, notifyAt)
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Debug Notificaciones</Text>
      <Text style={styles.caption}>Estado permisos: {status}</Text>

      {/* tus botones existentes... */}

      <Pressable style={styles.btn} onPress={presentNowDirect}>
        <Text style={styles.btnText}>🧪 presentNotificationAsync</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={schedule3sDirect}>
        <Text style={styles.btnText}>🧪 schedule 3s (directo)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { margin: 16, padding: 16, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.6)" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  caption: { marginBottom: 12, opacity: 0.8 },
  btn: { marginVertical: 6, paddingVertical: 12, borderRadius: 12, alignItems: "center", backgroundColor: "#111827" },
  btnText: { color: "#fff", fontWeight: "600" },
});
