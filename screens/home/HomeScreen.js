import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { HOME } from "../../constants/theme";
import { carousel, bottomBar } from "../../src/styles/homeCarousel";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import NotifyTestButton from "./NotifyTestButton";

const DATA = [
  {
    id: "1",
    chip: "Alimentación",
    title: "Agregá color a tus ensaladas",
    text: "Cada tono vegetal aporta distintos nutrientes. Cuantos más colores, más variedad de vitaminas y antioxidantes.",
    image: require("../../assets/cons-alimentacion.png"),
  },
  {
    id: "2",
    chip: "Hidratación",
    title: "Mantenete hidratado a lo largo del día",
    text: "No esperes a tener sed. Tomar agua regularmente ayuda a tu digestión, concentración y bienestar general.",
    image: require("../../assets/cons-hidratacion.jpg"),
  },
  {
    id: "3",
    chip: "Proteínas",
    title: "Incorporá proteínas todos los días",
    text: "Son fundamentales para reparar tejidos, fortalecer músculos y mantener la saciedad.",
    image: require("../../assets/cons-proteinas.jpg"),
  },
];

function AdviceCard({ item }) {
  return (
    <View style={[carousel.item, carousel.shadow]}>
      <Image source={item.image} style={carousel.image} />
      <View style={carousel.overlay}>
        <View style={carousel.chip}>
          <Text style={HOME.type.adviceChip12}>{item.chip}</Text>
        </View>
        <Text style={HOME.type.adviceTitle20}>{item.title}</Text>
        <Text style={[HOME.type.adviceText14, { marginTop: 6 }]}>
          {item.text}
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require("../../assets/bg2x.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View
          style={{
            paddingHorizontal: HOME.spacing.xl,
            paddingTop: HOME.spacing.xl,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                HOME.type.hola32ExtraBold,
                { color: "#B8D15F" } /* ¡Hola! en verde */,
              ]}
            >
              ¡Hola!
            </Text>
            <NotifyTestButton
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
              }}
              background={require("../../assets/bg-btn-stars.png")}
            />
          </View>

          <Text
            style={[HOME.type.lead20Medium, { marginTop: HOME.spacing.md }]}
          >
            El camino para{" "}
            <Text style={HOME.type.lead20BoldBlue}>
              empoderarte, comprender
            </Text>{" "}
            y elegir mejor .
          </Text>
          <Text style={[HOME.type.lead20BoldBlue]}>comienza ahora.</Text>
        </View>

        <View
          style={{
            gap: 12,
            paddingHorizontal: HOME.spacing.xl,
            marginTop: HOME.spacing.md,
          }}
        >
          {/* Card 1 */}
          <View
            style={{
              backgroundColor: HOME.colors.glass,
              borderRadius: HOME.radii.xl,
              padding: HOME.spacing.lg,
              borderWidth: 1,
              borderColor: HOME.colors.glassBorder,
            }}
          >
            <Text style={HOME.type.quickTitle16}>Guía para leer etiquetas</Text>
            <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
              Aprende a interpretar sellos de advertencia, tablas nutricionales
              y listas de ingredientes.
            </Text>
          </View>

          {/* Card 2 */}
          <View
            style={{
              backgroundColor: HOME.colors.glass,
              borderRadius: HOME.radii.xl,
              padding: HOME.spacing.lg,
              borderWidth: 1,
              borderColor: HOME.colors.glassBorder,
            }}
          >
            <Text style={HOME.type.quickTitle16}>
              Desmitificando lo “saludable”
            </Text>
            <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
              Identifica los ultraprocesados en productos que dicen ser sanos.
            </Text>
          </View>

          {/* Card 3 */}
          <View
            style={{
              backgroundColor: HOME.colors.glass,
              borderRadius: HOME.radii.xl,
              padding: HOME.spacing.lg,
              borderWidth: 1,
              borderColor: HOME.colors.glassBorder,
            }}
          >
            <Text style={HOME.type.quickTitle16}>Rangos saludables</Text>
            <Text style={[HOME.type.quickBody12, { marginTop: 6 }]}>
              Descubrí los rangos que te ayudan a interpretar si un producto es
              equilibrado.
            </Text>
          </View>
        </View>
        <Text
          style={[
            HOME.type.section20,
            { marginLeft: HOME.spacing.xl, marginTop: HOME.spacing.xl },
          ]}
        >
          Consejos que nutren tu día
        </Text>

        <FlatList
          data={DATA}
          keyExtractor={(it) => it.id}
          horizontal
          renderItem={({ item }) => <AdviceCard item={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: HOME.spacing.xl }}
          style={{ marginTop: HOME.spacing.md }}
          decelerationRate="fast"
          snapToInterval={300 + HOME.spacing.lg}
          snapToAlignment="start"
        />

        {/* Espaciador para que el scroll no tape el botón */}
        <View style={{ height: 120 + insets.bottom }} />
      </SafeAreaView>

      {/* Botón fijo inferior */}
      <View style={[bottomBar.container, { bottom: insets.bottom + 12 }]}>
        <BlurView intensity={28} tint="light" style={bottomBar.glassWrap}>
          <LinearGradient
            colors={[
              "rgba(255,255,255,0.6)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.6)",
            ]}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={bottomBar.glassGradient}
          />
        </BlurView>

        <TouchableOpacity
          activeOpacity={0.9}
          style={bottomBar.cta}
          onPress={() => navigation.navigate("Scan")}
        >
          <LinearGradient
            colors={["#70A8F9", "#5783B7"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[bottomBar.cta, { position: "absolute" }]}
          />
          <Text style={bottomBar.icon}>📷</Text>
          <Text style={bottomBar.ctaText}>Escanear producto</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
