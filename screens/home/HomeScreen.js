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
      <Pressable
        onPress={() => navigation.navigate('History')}
        accessibilityRole="button"
        accessibilityLabel="Ver historial de escaneos"
        style={({ pressed }) => ({
          opacity: pressed ? 0.85 : 1,
          marginTop: 16,
          padding: 16,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: '#eaeaea',
          backgroundColor: '#f9f9f9',
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
        })}
      >
        <Text style={{ fontSize: 16, fontWeight: '800', marginBottom: 4 }}>
          Historial de escaneos
        </Text>
        <Text style={{ fontSize: 13, color: '#555' }}>
          Consultá los productos que escaneaste recientemente.
        </Text>
        </Pressable>
    </View>
  );
}
