// screens/education/AdviceHydrationScreen.jsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { HOME } from "../../constants/theme";
import CustomHeader from "../../src/components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

export default function AdviceHydrationScreen() {
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
        <Text style={HOME.type.section20}>
          Mantenete hidratado a lo largo del día
        </Text>

        <Text style={[HOME.type.quickBody12, { marginTop: 8 }]}>
          La hidratación no depende solo de sentir sed. Pequeños sorbos
          constantes suelen funcionar mejor que tomar grandes cantidades de
          golpe, sobre todo en días largos o calurosos.
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            1. Señales de que quizá falta agua
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Cada cuerpo es distinto, pero hay algunas pistas que podés observar
            en tu día a día.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Sensación de cansancio o falta de concentración sin motivo
              claro.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Orina muy oscura y en poca cantidad.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Dolores de cabeza que mejoran al descansar e hidratarte.
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            2. Estrategias amables para tomar más líquido
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            No hace falta llegar a una cifra exacta todos los días. Podés probar
            distintas estrategias y quedarte con las que mejor se adapten a tu
            rutina.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Tener una botella a la vista mientras trabajás o estudiás.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Sumar infusiones sin azúcar, aguas saborizadas caseras o caldos
              suaves.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Asociar pequeños vasos de agua a hábitos ya instalados (por
              ejemplo, después de lavarte los dientes o al sentarte a trabajar).
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20, marginBottom: 24 }}>
          <Text style={HOME.type.quickTitle16}>
            3. También hidratan los alimentos
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Frutas, verduras y algunas preparaciones con alto contenido de agua
            también suman a tu hidratación total.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Frutas como naranja, melón, sandía o manzana.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Verduras como pepino, tomate, lechuga o zapallito.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
