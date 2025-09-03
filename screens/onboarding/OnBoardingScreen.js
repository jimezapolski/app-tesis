import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Image, 
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { COLORS, FONTS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utils/asyncStorage";

const { width, height } = Dimensions.get("window");

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
        onDone={handleDone}
        onSkip={handleDone}
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
                   <Image
                    style={styles.heroLogo}
                    source={require("../../assets/logo.png")}
                    resizeMode="contain"
                  /> 
                  <Animated.Text
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
                  style={[styles.onboardingTitleVerde, { opacity: fadeAnim }]}
                >
                  La alimentación es parte de tu bienestar
                </Animated.Text>

                <View style={styles.overlay}>
                   <Image
                    style={styles.heroImage}
                    source={require("../../assets/img-onboarding/onboarding2.png")}
                    resizeMode="contain"
                  /> 
                </View>
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
                 <Image
                    style={styles.heroImage}
                    source={require("../../assets/img-onboarding/onboarding3.png")}
                    resizeMode="contain"
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
                <Text style={styles.onboardingTitleVerde}>Escaneá y aprendé</Text>
                <View style={styles.overlay}>
                  <Image
                    style={styles.heroImage}
                    source={require("../../assets/img-onboarding/onboarding4.png")}
                    resizeMode="contain"
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
    backgroundColor: "#8FD16C",
    justifyContent: "center",
  },
  imageBackground: {
    width,
    height,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heroLogo: {
    width,
    height: height * 0.12, 
    position: "absolute",
    top: height * 0.45,
  },
  heroImage: {
    width,
    height: height * 0.25,
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
});
