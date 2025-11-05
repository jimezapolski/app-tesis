import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function ensurePermission() {
  let s = await Notifications.getPermissionsAsync();
  if (!(s.granted || (s.ios && s.ios.status === Notifications.IosAuthorizationStatus.AUTHORIZED))) {
    if (s.canAskAgain) s = await Notifications.requestPermissionsAsync();
  }
  return s.granted || (s.ios && s.ios.status === Notifications.IosAuthorizationStatus.AUTHORIZED);
}

export async function initNotifications() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  await ensurePermission();
}

export async function notifyNow(title, body) {
  try {
    if (!(await ensurePermission())) return null;
    return await Notifications.scheduleNotificationAsync({ content: { title, body }, trigger: null });
  } catch {
    return null;
  }
}
