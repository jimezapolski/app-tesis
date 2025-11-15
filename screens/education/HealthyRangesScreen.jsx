// screens/education/HealthyRangesScreen.jsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { HOME } from "../../constants/theme";
import CustomHeader from "../../src/components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

export default function HealthyRangesScreen() {
  const navigation = useNavigation();

  return (
    <>
      <CustomHeader
        title="Rangos saludables"
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
        <Text style={HOME.type.section20}>Rangos saludables</Text>

        {/* Intro */}
        <Text style={[HOME.type.quickBody12, { marginTop: 8 }]}>
          No existen números perfectos que sirvan para todas las personas, pero
          sí hay rangos orientativos que pueden ayudarte a leer mejor una
          etiqueta. La idea no es que cuentes todo, sino que tengas una
          referencia simple para identificar cuándo un producto se acerca a un
          perfil más equilibrado.
        </Text>

        {/* 1. Qué es un “rango saludable” */}
        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            1. ¿Qué entendemos por “rango saludable”?
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Un rango saludable es un valor aproximado que te orienta sobre si la
            cantidad de cierto nutriente en una porción es baja, moderada o
            alta. No reemplaza la recomendación profesional, pero te da una
            brújula para el día a día.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Pensá estos rangos para alimentos que consumís con frecuencia,
              no para excepciones.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Lo más importante es el patrón general: lo que comés la mayor
              parte del tiempo.
            </Text>
          </View>
        </View>

        {/* 2. Sodio */}
        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>2. Mirar el sodio</Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            El sodio aparece en la tabla nutricional y suele estar elevado en
            productos ultra procesados, snacks, fiambres y comidas listas para
            consumir.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Si una porción pequeña ya aporta un porcentaje alto del valor
              diario, es una señal para moderar su consumo habitual.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Cuando compares productos similares (por ejemplo, dos tipos de
              galletitas o dos sopas instantáneas), preferí el que tenga menos
              sodio por porción.
            </Text>
          </View>
        </View>

        {/* 3. Grasas totales y saturadas */}
        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            3. Grasas totales y grasas saturadas
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            Las grasas son necesarias, pero importa el tipo y la cantidad. Las
            grasas saturadas y, especialmente, las grasas trans son las que
            conviene limitar.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • En productos de uso diario (quesos untables, galletitas,
              panificados), elegí opciones con menos grasas saturadas por
              porción.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Si el % de valor diario en grasas saturadas es muy alto para una
              porción chica, puede ser un producto para consumir solo de forma
              ocasional.
            </Text>
          </View>
        </View>

        {/* 4. Azúcares */}
        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            4. Azúcares: mirar el contexto
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            No todos los azúcares son iguales, pero cuando un producto agrega
            muchos azúcares libres (azúcar, jarabes, miel, etc.) conviene
            prestar atención a la cantidad y la frecuencia con la que lo
            consumís.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Si el producto es principalmente azúcar con algo más (por
              ejemplo, golosinas, bebidas azucaradas), pensalo como un “a
              veces”, no como algo de todos los días.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • En otros productos, como yogures o barras de cereal, compará
              marcas y elegí las que tengan menos azúcares totales por porción.
            </Text>
          </View>
        </View>

        {/* 5. Fibra y otros nutrientes que suman */}
        <View style={{ marginTop: 20 }}>
          <Text style={HOME.type.quickTitle16}>
            5. Fibra y nutrientes que juegan a favor
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            No todo es “evitar”. También es útil mirar qué nutrientes aportan
            beneficios y pueden mejorar el perfil general del producto.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Más fibra suele ser una buena señal: ayuda a la saciedad, la
              digestión y la salud intestinal.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Proteínas y grasas saludables (como las de frutos secos y
              semillas) pueden hacer que un producto sea más saciante.
            </Text>
          </View>
        </View>

        {/* 6. Cómo usar los rangos en la práctica */}
        <View style={{ marginTop: 20, marginBottom: 24 }}>
          <Text style={HOME.type.quickTitle16}>
            6. Cómo aplicar todo esto sin agobiarte
          </Text>
          <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
            No hace falta que mires todos los detalles siempre. Podés empezar
            por un solo paso y sumar de a poco.
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={HOME.type.quickBody12}>
              • Primer paso: elegí un nutriente para revisar (por ejemplo,
              sodio) en los productos que consumís todos los días.
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Segundo paso: cuando te sientas más cómoda, sumá otro (grasas
              saturadas, azúcares, etc.).
            </Text>
            <Text style={HOME.type.quickBody12}>
              • Tercer paso: usá estos rangos para comparar entre productos
              similares y quedarte con el que mejor se adapte a tus objetivos.
            </Text>
          </View>

          <Text
            style={[
              HOME.type.quickBody12,
              { marginTop: 12, fontStyle: "italic" },
            ]}
          >
            Los rangos no están para exigirte perfección, sino para acompañarte
            a encontrar un punto medio que sea posible para vos y para tu
            rutina.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
