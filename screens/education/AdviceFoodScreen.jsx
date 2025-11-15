// screens/education/AdviceFoodScreen.jsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { HOME } from "../../constants/theme";
import CustomHeader from "../../src/components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

export default function AdviceFoodScreen() {
  const navigation = useNavigation();

  return (
    <>
      <CustomHeader
        title="Consejos para tu día a día"
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: HOME.spacing.xl,
          paddingVertical: HOME.spacing.lg,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={HOME.type.section20}>Agregá color a tus ensaladas</Text>

        <Text style={[HOME.type.quickBody12, { marginTop: 8 }]}>
          Sumar colores al plato no es solo algo estético: cada tono vegetal
          suele aportar vitaminas, minerales y compuestos distintos. Más
          variedad de colores suele significar más variedad de nutrientes.
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            1. ¿Por qué importa el color?
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Los vegetales de distintos colores aportan combinaciones diferentes
            de nutrientes. No hace falta memorizar todo, pero conocer algunos
            ejemplos puede ayudarte a variar sin complicarte.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Verdes (espinaca, rúcula, brócoli): suelen aportar folatos,
              hierro y fibra.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Rojos y naranjas (tomate, zanahoria, morrón): aportan
              carotenoides y vitamina C.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Morados (repollo morado, remolacha): aportan antioxidantes como
              antocianinas.
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            2. Ideas simples para todos los días
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            No hace falta cambiar todo tu menú. Podés empezar sumando color a
            preparaciones que ya hacés.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Agregar un puñado de hojas verdes a platos de siempre (pastas,
              tartas, salteados).
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Combinar al menos 2–3 colores en la misma ensalada.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Usar vegetales crudos y cocidos para variar texturas y sabores.
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20, marginBottom: 24 }}>
          <Text style={HOME.type.quickTitle16}>3. Sin reglas rígidas</Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Habrá días con platos más coloridos y otros más simples, y está
            bien. Mirá el conjunto de la semana, no una comida aislada. Podés
            avanzar de a un cambio por vez.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
