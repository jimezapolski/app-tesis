// screens/education/HealthyMythsScreen.jsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { HOME } from "../../constants/theme";
import CustomHeader from "../../src/components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

export default function HealthyMythsScreen() {
  const navigation = useNavigation();
  return (
    <>
      <CustomHeader
        title="Desmitificando lo “saludable”"
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
        {/* Título principal */}
        <Text style={HOME.type.section20}>Desmitificando lo “saludable”</Text>

        {/* Intro */}
        <Text style={[HOME.type.quickBody12, { marginTop: 8 }]}>
          Muchas veces elegimos productos porque “parecen saludables”, pero el
          envase puede contar solo una parte de la historia. Esta guía no busca
          demonizar alimentos, sino darte herramientas para mirar más allá del
          marketing y decidir con calma.
        </Text>

        {/* 1. Palabras que seducen */}
        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            1. Palabras que suenan bien… pero no lo dicen todo
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Términos como “light”, “fit”, “natural”, “artesanal” o “saludable”
            no garantizan por sí mismos que un producto tenga un buen perfil
            nutricional.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • “Light” suele significar menos de algo (grasas, azúcar, sodio),
              pero puede seguir siendo alto en calorías o en otros nutrientes.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • “Sin azúcar agregada” no implica “sin azúcar”: puede tener
              azúcares propios de la fruta o la leche en cantidades importantes.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • “Integral” o “con semillas” no compensa si la base del producto
              es azúcar, grasas y harinas refinadas.
            </Text>
          </View>
        </View>

        {/* 2. Ultraprocesados “disfrazados” */}
        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            2. Cuando un ultraprocesado se disfraza de sano
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Algunos productos combinan mensajes positivos (“con vitaminas”, “con
            proteínas”, “con fibra”) con grandes cantidades de azúcar, grasas o
            sodio. El resultado es un envase muy convincente, pero un producto
            para consumir con moderación.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Revisá siempre la tabla nutricional aunque el mensaje del frente
              parezca “ideal”.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Si la lista de ingredientes es muy larga y tiene muchos nombres
              que no reconocés, probablemente sea un alimento ultraprocesado.
            </Text>
          </View>
        </View>

        {/* 3. Señales de alerta en el envase */}
        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            3. Señales de alerta que podés observar
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            No se trata de prohibir, sino de identificar cuándo un producto
            conviene dejar para “a veces” y no para todos los días.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Muchos azúcares distintos en los ingredientes (azúcar, jarabe,
              glucosa, dextrosa, maltodextrina, etc.).
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Grasas saturadas o grasas trans en valores altos por porción.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Mucho sodio en una porción pequeña para algo que consumís con
              frecuencia (galletitas saladas, snacks, fiambres, etc.).
            </Text>
          </View>
        </View>

        {/* 4. Cómo usar la información sin obsesionarse */}
        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            4. Usar la información sin caer en la culpa
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Saber más sobre los productos no significa que tengas que comer
            “perfecto”. La idea es que puedas decidir qué lugar querés que ocupe
            cada alimento en tu día a día.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Podés reservar ciertos productos para momentos puntuales y
              elegir opciones más simples para el uso cotidiano.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Mirar las etiquetas es una forma de autocuidado, no un examen.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Si un producto te gusta mucho, conocer su composición te ayuda a
              decidir con qué frecuencia querés incluirlo.
            </Text>
          </View>
        </View>

        {/* Cierre */}
        <View style={{ marginTop: 24, marginBottom: 24 }}>
          <Text style={[HOME.type.quickBody12, { fontStyle: "italic" }]}>
            Lo “saludable” no es un rótulo perfecto, es un equilibrio que tiene
            en cuenta tu contexto, tus gustos y tu realidad. La información está
            para empoderarte, no para juzgarte.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
