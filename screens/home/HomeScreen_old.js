import React from "react";
import { View, Text, Pressable } from "react-native";
import { ui, COLORS, FONTS } from "../../constants/theme";
import NotifyTestButton from "./NotifyTestButton";

export default function HomeScreen({ navigation }) {
  return (
    
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
 <NotifyTestButton />

      <Text style={{ fontSize: FONTS.tituloVerde.fontSize, marginBottom: 16, color: FONTS.tituloVerde.color, fontFamily: FONTS.tituloVerde.fontFamily, fontWeight: "700" }}>
      Hola! 👋🏼 
      </Text>

      <Pressable
        onPress={() => navigation.navigate("Scan")}
        style={{
          backgroundColor: COLORS.logoVerde,
          paddingVertical: 14,
          paddingHorizontal: 24,
          marginTop: 16,
          borderRadius: 12,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700",  fontFamily: ui.type.h1.fontFamily, }}>Abrir escáner</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('History')}
        accessibilityRole="button"
        accessibilityLabel="Ver historial de escaneos"
        style={({ pressed }) => ({
          marginTop: 16,
          opacity: pressed ? 0.85 : 1,
          marginTop: 32,
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
        <Text style={{ fontSize: 16, fontWeight: '800', marginBottom: 4 , color: COLORS.logoCeleste}}>
          Historial de escaneos
        </Text>
        <Text style={{ fontSize: 13, color: COLORS.celesteOscuro }}>
          Consultá los productos que escaneaste recientemente.
        </Text>
        </Pressable>
    </View>
  );
}
