import React from "react";
import { View, Text, Pressable } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>
        Bienvenida, probemos el escáner 👇
      </Text>

      <Pressable
        onPress={() => navigation.navigate("Scan")}
        style={{
          backgroundColor: "#2e7d32",
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Abrir escáner</Text>
      </Pressable>
    </View>
  );
}
