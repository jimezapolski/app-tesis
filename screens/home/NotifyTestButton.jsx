import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { notifyNow } from "../../src/notifications/notify";

export default function NotifyTestButton() {
  async function onMotivarAhora() {
    const id = await notifyNow(
      "🌿 Cada elección cuenta",
      "Hoy diste un paso hacia una mejor alimentación."
    );
    if (!id) {
      // Fallback directo si por algún motivo nuestro wrapper no dispara
      await Notifications.presentNotificationAsync({
        title: "🌿 Cada elección cuenta",
        body: "Hoy diste un paso hacia una mejor alimentación.",
      });
    }
  }

  return (
    <Pressable style={styles.btn} onPress={onMotivarAhora}>
      <Text style={styles.btnText}>💫 Motivar ahora</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    margin: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#111827",
  },
  btnText: { color: "#fff", fontWeight: "700" },
});
