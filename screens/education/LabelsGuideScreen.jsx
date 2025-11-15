// screens/education/LabelsGuideScreen.jsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { HOME } from "../../constants/theme";
import CustomHeader from "../../src/components/CustomHeader";
import { useNavigation } from "@react-navigation/native";



export default function LabelsGuideScreen() {
   const navigation = useNavigation();
  return (
    <>
     <CustomHeader
        title="Guía para leer etiquetas"
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
      <Text style={HOME.type.section20}>Guía para leer etiquetas</Text>

      {/* Intro */}
      <Text style={[HOME.type.quickBody12, { marginTop: 8 }]}>
        Las etiquetas son una herramienta para ayudarte a decidir qué consumir,
        no para generarte culpa. Acá tenés una guía simple para mirar primero lo
        más importante.
      </Text>

      {/* 1. Porción */}
      <View style={{ marginTop: 20 }}>
        <Text style={HOME.type.quickTitle16}>1. Empezá por la porción</Text>
        <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
          La información nutricional siempre se expresa por porción. Si comés
          más de lo que indica el envase, también aumentan las calorías, las
          grasas, los azúcares y el sodio que consumís.
        </Text>

        <View style={{ marginTop: 8 }}>
          <Text style={HOME.type.quickBody12}>• Mirá cuántos gramos o ml son.</Text>
          <Text style={HOME.type.quickBody12}>
            • Compará la porción del envase con lo que realmente comés (por
            ejemplo, ¿3 galletitas o 6?).
          </Text>
        </View>
      </View>

      {/* 2. Nutrientes clave */}
      <View style={{ marginTop: 20 }}>
        <Text style={HOME.type.quickTitle16}>
          2. Nutrientes clave a revisar
        </Text>
        <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
          No hace falta memorizar todo. Para empezar, enfocarte en algunos
          nutrientes te ayuda a tener una idea general del producto.
        </Text>

        <View style={{ marginTop: 8 }}>
          <Text style={HOME.type.quickBody12}>
            • Grasas saturadas y grasas trans: cuanto menos, mejor.
          </Text>
          <Text style={HOME.type.quickBody12}>
            • Sodio: preferí opciones con menor cantidad, especialmente si las
            consumís todos los días.
          </Text>
          <Text style={HOME.type.quickBody12}>
            • Azúcares: si el valor es muy alto y aparece varias veces en los
            ingredientes (azúcar, jarabes, etc.), es una señal para moderar.
          </Text>
          <Text style={HOME.type.quickBody12}>
            • Fibra alimentaria: más fibra suele ser un punto a favor
            (saciedad, digestión, salud intestinal).
          </Text>
        </View>
      </View>

      {/* 3. % Valor Diario */}
      <View style={{ marginTop: 20 }}>
        <Text style={HOME.type.quickTitle16}>3. ¿Qué es el % de Valor Diario?</Text>
        <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
          El %VD indica qué porcentaje de lo recomendado para un día completo
          aporta esa porción, según una dieta de referencia de 2000 kcal. No es
          una regla rígida, pero sirve como orientación rápida.
        </Text>

        <View style={{ marginTop: 8 }}>
          <Text style={HOME.type.quickBody12}>
            • Un %VD muy alto en grasas saturadas, azúcares o sodio indica que
            conviene consumirlo con menos frecuencia o en porciones más chicas.
          </Text>
          <Text style={HOME.type.quickBody12}>
            • Pensá en el producto dentro del día completo, no aislado.
          </Text>
        </View>
      </View>

      {/* 4. Lista de ingredientes */}
      <View style={{ marginTop: 20 }}>
        <Text style={HOME.type.quickTitle16}>4. Leé la lista de ingredientes</Text>
        <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
          Los ingredientes se ordenan de mayor a menor cantidad. Los primeros de
          la lista son los que más peso tienen en el producto.
        </Text>

        <View style={{ marginTop: 8 }}>
          <Text style={HOME.type.quickBody12}>
            • Si los primeros son azúcar, jarabes o grasas, es probable que no
            sea la mejor opción para todos los días.
          </Text>
          <Text style={HOME.type.quickBody12}>
            • Mientras más corta y conocida la lista, más fácil es entender qué
            estás consumiendo.
          </Text>
          <Text style={HOME.type.quickBody12}>
            • Prestá atención a nombres técnicos que escondan azúcares o grasas
            (jarabe de maíz, sólidos lácteos, etc.).
          </Text>
        </View>
      </View>

      {/* 5. Comparar productos */}
      <View style={{ marginTop: 20, marginBottom: 24 }}>
        <Text style={HOME.type.quickTitle16}>5. Compará entre productos</Text>
        <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
          Cuando dudes entre dos opciones, compará siempre usando la misma
          porción (por 100 g o por la misma medida casera).
        </Text>

        <View style={{ marginTop: 8 }}>
          <Text style={HOME.type.quickBody12}>
            • Elegí el que tenga menos grasas saturadas y sodio.
          </Text>
          <Text style={HOME.type.quickBody12}>
            • Si tienen calorías similares, fijate el perfil: más fibra y menos
            grasas y azúcares suele ser una mejor elección.
          </Text>
        </View>

        <Text
          style={[
            HOME.type.quickBody12,
            { marginTop: 12, fontStyle: "italic" },
          ]}
        >
          No se trata de prohibir alimentos, sino de entender qué aportan para
          poder decidir con más calma y menos culpa.
        </Text>
      </View>
    </ScrollView>
    </>
    
  );
}
