// screens/education/AdviceProteinScreen.jsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { HOME } from "../../constants/theme";
import CustomHeader from "../../src/components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

export default function AdviceProteinScreen() {
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
          Incorporá proteínas todos los días
        </Text>

        <Text style={[HOME.type.quickBody12, { marginTop: 8 }]}>
          Las proteínas colaboran en la reparación de tejidos, el mantenimiento
          de la masa muscular y la saciedad. No es algo exclusivo del “mundo
          fitness”: todas las personas las necesitan en su alimentación diaria.
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            1. ¿Por qué son importantes?
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Las proteínas participan en muchos procesos del cuerpo, desde los
            músculos hasta el sistema inmune.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Ayudan a mantener y reparar la masa muscular.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Aportan saciedad y pueden ayudar a regular el apetito.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Forman parte de hormonas, enzimas y defensas del organismo.
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            2. Fuentes cotidianas de proteína
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Podés combinar alimentos de origen animal y vegetal según tus
            gustos, tu presupuesto y tus necesidades.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Origen animal: huevos, yogur, quesos, carnes, pescados.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Origen vegetal: legumbres (lentejas, garbanzos, porotos), tofu,
              tempeh, frutos secos y semillas.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Combinar cereales + legumbres (por ejemplo, arroz con lentejas)
              mejora la calidad de proteínas vegetales.
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20, marginBottom: 24 }}>
          <Text style={HOME.type.quickTitle16}>
            3. Cómo integrarlas en tu día
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            En lugar de pensar en un número exacto, podés empezar por revisar si
            cada comida principal incluye alguna fuente de proteína.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Sumar un huevo, yogur o un puñado de frutos secos a desayunos o
              meriendas.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Incluir siempre alguna fuente proteica en almuerzo y cena (por
              ejemplo, legumbres, carnes, quesos o tofu).
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
