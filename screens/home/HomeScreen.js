// screens/home/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { HOME } from "../../constants/theme";
import { carousel, bottomBar } from "../../src/styles/homeCarousel";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import NotifyTestButton from "./NotifyTestButton";
import QuickLinkCard from "../../src/components/QuickLinkCard";
import InfoIcon from "../../assets/icons/info.svg";
import EyeIcon from "../../assets/icons/eye.svg";
import BarsIcon from "../../assets/icons/bar-chart-3.svg";
import ScannerIcon from "../../assets/icons/scanner.svg";

const DATA = [
  {
    id: "1",
    chip: "Alimentación",
    title: "Agregá color a tus ensaladas",
    text: "Cada tono vegetal aporta distintos nutrientes. Cuantos más colores, más variedad de vitaminas y antioxidantes.",
    image: require("../../assets/cons-alimentacion1.png"),
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 160 + insets.bottom, 
          }}
          scrollIndicatorInsets={{ bottom: insets.bottom + 80 }}
        >
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

          {/* QUICK LINKS */}
          <View
            style={{
              gap: 12,
              paddingHorizontal: HOME.spacing.xl,
              marginTop: HOME.spacing.md,
            }}
          >
            <View
              style={{
                width: "100%",
                alignSelf: "center",
                gap: 12,
                marginTop: HOME.spacing.md,
              }}
            >
              <QuickLinkCard
                title="Guía para leer etiquetas"
                subtitle="Aprende a interpretar sellos de advertencia, tablas nutricionales y listas de ingredientes."
                SvgIcon={InfoIcon}
                onPress={() => navigation.navigate("LabelsGuide")}
              />

              <QuickLinkCard
                title="Desmitificando lo “saludable”"
                subtitle="Identifica los ultraprocesados en productos que dicen ser sanos."
                SvgIcon={EyeIcon}
                onPress={() => navigation.navigate("HealthyMyths")}
              />

              <QuickLinkCard
                title="Rangos saludables"
                subtitle="Descubrí los rangos que te ayudan a interpretar si un producto es equilibrado."
                SvgIcon={BarsIcon}
                onPress={() => navigation.navigate("HealthyRanges")}
              />
            </View>
          </View>

          {/* SECCIÓN CARRUSEL */}
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
        </ScrollView>
      </SafeAreaView>

      {/* BOTÓN FIJO INFERIOR */}
      <View
        pointerEvents="box-none"
        style={[
          bottomBar.container,
          { bottom: insets.bottom + 60, left: 0, right: 0 }, // full width
        ]}
      >
        {/* Blur ancho completo */}
        <BlurView
          intensity={28}
          tint="light"
          style={styles.glassFull}
          pointerEvents="none"
        />

        {/* Botón centrado, dentro del blur */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.ctaWrap}
          onPress={() => navigation.navigate("Scan")}
        >
          {/* Degradé azul del botón (si querés, podés dejarlo como backgroundColor fijo) */}
          <LinearGradient
            colors={["#70A8F9", "#5783B7"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.ctaContent}>
            {/* Ícono + texto centrados */}
            {typeof ScannerIcon === "function" ? (
              <ScannerIcon width={20} height={20} color="#ffffff" />
            ) : (
              <Image source={scannerPng} style={{ width: 20, height: 20 }} />
            )}

            <Text style={bottomBar.ctaText}>Escanear producto</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    
  );
}
const styles = StyleSheet.create({
  // … tus estilos previos …

  // Blur ancho completo, con pill grande
  glassFull: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 136,           // alto del “vidrio”
    borderRadius: 0,
    backgroundColor: "rgba(255,255,255,0.18)",
    overflow: "hidden",
  },

  // Botón centrado dentro del blur
  ctaWrap: {
    position: "absolute",
    top: 16,               // separa del borde superior del blur
    alignSelf: "center",
    height: 60,
    borderRadius: 40,
    width: "86%",          // más centrado y con respiración a los lados
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  // Contenido del botón (ícono + texto)
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 16,
  },
});
