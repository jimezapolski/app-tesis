// screens/onboarding/OnboardingScreen.js
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { COLORS, FONTS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utils/asyncStorage";

const { width, height } = Dimensions.get("window");

// Bridge mínimo a tu theme
const UI = {
  colors: {
    primary: COLORS.logoCeleste, // CTA y dot activo (podés cambiar a COLORS.logoVerde si te gusta más)
    bg: COLORS.verdeClaro, // fondo cálido
    text: COLORS.text,
    dot: COLORS.celesteOscuro, // dot inactivo
  },
  radius: 12,
};

// Dot accesible y consistente con la paleta
const Dot = ({ selected }) => (
  <Text
    accessibilityRole="text"
    accessibilityLabel={selected ? "Paso actual" : "Paso"}
    style={{
      margin: 4,
      fontSize: selected ? 14 : 10,
      color: selected ? UI.colors.primary : UI.colors.dot,
    }}
  >
    •
  </Text>
);

// Botón “pastilla” reutilizable para Next/Skip/Done
const TextButton = ({ label, style, ...rest }) => (
  <TouchableOpacity
    {...rest}
    accessibilityRole="button"
    accessibilityLabel={label}
    hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
  >
    <Text
      style={[
        {
          color: "#FFFFFF",
          fontSize: 16,
          fontFamily: FONTS.subtituloTexto.fontFamily,
          textAlign: "center",
        },
        style,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
export default function OnBoardingScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleDone = () => {
    navigation.navigate("Home");
    setItem("onboarded", "1");
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Onboarding
        containerStyles={{ backgroundColor: COLORS.verdeClaro }}
        bottomBarColor="transparent"
        DotComponent={Dot}
        SkipButtonComponent={(p) => (
          <TextButton label="Saltar" style={styles.botonIzq} {...p} />
        )}
        NextButtonComponent={(p) => (
          <TextButton label="Siguiente" style={styles.botonDer} {...p} />
        )}
        DoneButtonComponent={(p) => (
          <TextButton label="Empezar" style={styles.botonDer} {...p} />
        )}
        onDone={handleDone}
        onSkip={handleDone}
        titleStyles={{ display: "none" }}
        subTitleStyles={{ display: "none" }}
        pages={[
          {
            backgroundColor: "transparent",
            image: (
              <ImageBackground
                source={require("../../assets/img-onboarding/fondos/fondoOnboarding-1.png")}
                style={styles.imageBackground}
                resizeMode="cover"
              >
                <View style={styles.overlay}>
                  <LottieView
                    style={styles.lottieLOGO}
                    source={require("../../assets/animations/logo.json")}
                    autoPlay
                    // loop por defecto; podés poner loop={false} si querés que corra una sola vez
                    accessibilityIgnoresInvertColors
                  />
                  <Animated.Text
                    accessibilityRole="header"
                    style={[styles.onboardingTitle, { opacity: fadeAnim }]}
                  >
                    El camino para empoderar tu nutrición
                  </Animated.Text>
                </View>
              </ImageBackground>
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: "transparent",
            image: (
              <ImageBackground
                source={require("../../assets/img-onboarding/fondos/fondoOnboarding-2.png")}
                style={styles.imageBackground}
                resizeMode="cover"
              >
                <Animated.Text
                  accessibilityRole="header"
                  style={[styles.onboardingTitleVerde, { opacity: fadeAnim }]}
                >
                  La alimentación es parte de tu bienestar
                </Animated.Text>

                {/* Si querés reactivar el Lottie, descomentá y ajustá el source */}
                {/* <View style={styles.overlay}>
                  <LottieView
                    style={styles.lottieIMG}
                    source={require("../../assets/animations/onboarding2.json")}
                    autoPlay
                    accessibilityIgnoresInvertColors
                  />
                </View> */}
                <Text style={styles.subtituloAzul}>
                  Acá vas a encontrar información clara sobre los alimentos, sin
                  confusión ni miedo, para que tomes decisiones que realmente te
                  sirvan
                </Text>
              </ImageBackground>
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: "transparent",
            image: (
              <ImageBackground
                source={require("../../assets/img-onboarding/fondos/fondoOnboarding-3.png")}
                style={styles.imageBackground}
                resizeMode="cover"
              >
                <Text style={styles.onboardingTitleAzul}>
                  No se trata de eliminar alimentos, sino de entenderlos
                </Text>
                <View style={styles.overlay}>
                  <LottieView
                    style={styles.lottieIMG}
                    source={require("../../assets/animations/onboarding3.json")}
                    autoPlay
                    accessibilityIgnoresInvertColors
                  />
                </View>
                <Text style={styles.subtituloVerde}>
                  La clave es conocer qué te aporta cada producto y cómo
                  incorporarlo de forma consciente
                </Text>
              </ImageBackground>
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: "transparent",
            image: (
              <ImageBackground
                source={require("../../assets/img-onboarding/fondos/fondoOnboarding-4.png")}
                style={styles.imageBackground}
                resizeMode="cover"
              >
                <Text style={styles.onboardingTitleVerde}>
                  Escaneá y aprendé
                </Text>
                <View style={styles.overlay}>
                  <LottieView
                    style={styles.lottieIMG}
                    source={require("../../assets/animations/onboarding4.json")}
                    autoPlay
                    accessibilityIgnoresInvertColors
                  />
                </View>
                <Text style={styles.subtituloAzul}>
                  Con esta función podés escanear un producto y recibir
                  información en tiempo real sobre su valor nutricional y sus
                  beneficios
                </Text>
              </ImageBackground>
            ),
            title: "",
            subtitle: "",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Fondo toma la paleta del theme (ya no hardcodeado)
    backgroundColor: UI.colors.bg,
    justifyContent: "center",
  },
  imageBackground: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  lottieLOGO: {
    width: width,
    height: height * 0.5,
    position: "absolute",
  },
  lottieIMG: {
    width: width,
    height: height * 0.4,
    alignSelf: "center",
    marginBottom: 10,
  },
  onboardingTitle: {
    marginTop: height * 0.2,
    fontSize: 20,
    fontFamily: FONTS.subtituloTexto.fontFamily,
    color: COLORS.text,
    textAlign: "center",
  },
  onboardingTitleVerde: {
    paddingHorizontal: 18,
    fontSize: 28,
    fontFamily: FONTS.subtituloTexto.fontFamily,
    color: COLORS.verdeOscuro,
    textAlign: "center",
    marginTop: height * 0.3,
  },
  onboardingTitleAzul: {
    paddingHorizontal: 18,
    fontSize: 28,
    fontFamily: FONTS.subtituloTexto.fontFamily,
    color: COLORS.text,
    textAlign: "center",
    marginTop: height * 0.3,
  },
  subtituloAzul: {
    paddingHorizontal: 18,
    marginBottom: height * 0.2,
    fontSize: 18,
    fontFamily: FONTS.subtituloTexto.fontFamily,
    color: COLORS.text,
    textAlign: "center",
  },
  subtituloVerde: {
    paddingHorizontal: 18,
    marginBottom: height * 0.2,
    fontSize: 18,
    fontFamily: FONTS.subtituloTexto.fontFamily,
    color: COLORS.verdeOscuro,
    textAlign: "center",
  },
  botonIzq: { marginLeft: 20, marginBottom: 6 }, // probá 16–28 según gusto
  botonDer: { marginRight: 20, marginBottom: 6 }, // probá 16–28 según gusto
});
