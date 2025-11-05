import * as Notifications from "expo-notifications";
import { notifyNow, notifyAt, notifyDaily, notifyEveryMinutes } from "../../src/notifications/notify";

async function onMotivarAhora() {
  const id = await notifyNow("🌿 Cada elección cuenta", "Hoy diste un paso hacia una mejor alimentación.");
  if (!id) {
    // fallback directo (si por cualquier motivo nuestro wrapper no dispara)
    await Notifications.presentNotificationAsync({
      title: "🌿 Cada elección cuenta",
      body: "Hoy diste un paso hacia una mejor alimentación.",
    });
  }
}
