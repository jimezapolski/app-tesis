// src/screens/onboarding/OnBoardingScreen.jsx
import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../../src/utils/asyncStorage";
import GlassPanel from "../../src/components/GlassPanel";
import FancyIllus from "../../src/components/FancyIllus";

const { width, height } = Dimensions.get("window");

export default function OnBoardingScreen() {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(0); // solo para UI/animación

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(1)).current;
  const lockRef = useRef(false);

  const handleDone = () => {
    setItem("onboarded", "1");
    navigation.replace("Home");
  };

  const handleSkip = () => {
    setItem("onboarded", "1");
    navigation.replace("Home");
  };

  // --- helpers robustos ---
  const getCurrent = () => {
    const inst = swiperRef.current;
    const cp =
      inst && inst.state && Number.isInteger(inst.state.currentPage)
        ? inst.state.currentPage
        : index;
    return cp;
  };

  const goTo = (page) => {
    const inst = swiperRef.current;
    if (inst?.goToPage) inst.goToPage(page, true);
    else if (inst?.scrollToPage) inst.scrollToPage(page, true);
    else setIndex(page); // fallback visual
  };

  const goNext = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 320);

    const current = getCurrent();
    const last = PAGES.length - 1;
    if (current >= last) {
      handleDone();
      return;
    }
    goTo(current + 1);
  };

  const onSlideChange = (i /*, prev */) => {
    // i es el índice actual según la lib
    setIndex(i);
    slideAnim.setValue(0);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 380,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const TITLE = { fontFamily: "Figtree-Bold", fontSize: 34, color: "#FFFFFF" };
  const BODY = {
    fontFamily: "Figtree-Regular",
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 22,
  };
  const SKIP = {
    fontFamily: "Figtree-SemiBold",
    fontSize: 14,
    color: "rgba(235,235,245,0.90)",
  };

  const ContentAnim = ({ children }) => (
    <Animated.View
      style={{
        opacity: slideAnim,
        transform: [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );

  // --------- PAGES memo para no recrearlas en cada render ----------
  const PAGES = useMemo(
    () => [
      {
        backgroundColor: "transparent",
        image: (
          <View style={styles.pageWrap}>
            <View style={styles.cover}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
                El camino para empoderar tu nutrición
              </Animated.Text>

              {/* Botón imagen + texto */}
              <View style={styles.glassButtonWrap}>
                <Image
                  source={require("../../assets/Button-glas.png")}
                  style={styles.glassButtonBg}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.glassButtonTouch}
                  onPress={goNext}
                >
                  <Text style={styles.glassButtonText}>Comenzar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),
        title: "",
        subtitle: "",
      },
      {
        backgroundColor: "transparent",
        image: (
          <View style={styles.pageWrap}>
            <View
              style={{ alignItems: "center", marginTop: 56, marginBottom: 8 }}
            >
              <FancyIllus
                source={require("../../assets/img-onboarding/illus-heart.png")}
                width={180}
                height={140}
                float={7}
                scaleMin={0.99}
                duration={2400}
                delay={0}
                style={{ marginTop: 150 }}
              />
            </View>

            <View style={styles.centerBottom}>
              <GlassPanel
                radius={26}
                intensity={85}
                tint="light"
                style={{ width: width - 32 }}
              >
                <ContentAnim>
                  <Text style={TITLE}>
                    La alimentación{"\n"}es parte de tu{"\n"}bienestar
                  </Text>
                  <View style={{ height: 12 }} />
                  <Text style={BODY}>
                    Acá vas a encontrar información clara sobre los alimentos,
                    sin confusión ni miedo, para que tomes decisiones que
                    realmente te sirvan.
                  </Text>

                  <View style={styles.footerRow}>
                    <TouchableOpacity onPress={handleSkip}>
                      <Text style={SKIP}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.arrowBtnWrap}
                      onPress={goNext}
                    >
                      <Text style={{ fontSize: 20, color: "#ffffff" }}>➔</Text>
                    </TouchableOpacity>
                  </View>
                </ContentAnim>
              </GlassPanel>
            </View>
          </View>
        ),
        title: "",
        subtitle: "",
      },
      {
        backgroundColor: "transparent",
        image: (
          <View style={styles.pageWrap}>
            <View
              style={{ alignItems: "center", marginTop: 56, marginBottom: 8 }}
            >
              <FancyIllus
                source={require("../../assets/img-onboarding/illus-option.png")}
                width={180}
                height={132}
                float={6}
                scaleMin={0.992}
                duration={2500}
                delay={300}
                style={{ marginTop: 160 }}
              />
            </View>

            <View style={styles.centerBottom}>
              <GlassPanel
                radius={26}
                intensity={85}
                tint="light"
                style={{ width: width - 32 }}
              >
                <ContentAnim>
                  <Text style={TITLE}>
                    Comer bien no{"\n"}tiene que ser{"\n"}complicado
                  </Text>
                  <View style={{ height: 12 }} />
                  <Text style={BODY}>
                    La app te ayuda a entender qué te aporta cada producto y
                    cómo incorporarlo de forma consciente, para que tu
                    alimentación sea simple y funcional para vos.
                  </Text>

                  <View style={styles.footerRow}>
                    <TouchableOpacity onPress={handleSkip}>
                      <Text style={SKIP}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.arrowBtnWrap}
                      onPress={goNext}
                    >
                      <Text style={{ fontSize: 20, color: "#ffffff" }}>➔</Text>
                    </TouchableOpacity>
                  </View>
                </ContentAnim>
              </GlassPanel>
            </View>
          </View>
        ),
        title: "",
        subtitle: "",
      },
      {
        backgroundColor: "transparent",
        image: (
          <View style={styles.pageWrap}>
            <View
              style={{ alignItems: "center", marginTop: 56, marginBottom: 8 }}
            >
              <FancyIllus
                source={require("../../assets/img-onboarding/illus-scanner.png")}
                width={200}
                height={160}
                float={8} // ↑↓ sutil; probá 6–10 según gusto
                scaleMin={0.985} // respiración muy leve
                duration={2600} // ciclo suave
                delay={150}
                style={{ marginTop: 122,
                  marginLeft: 25,
                  shadowColor: "#fff",
                  shadowOpacity: 0.08,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 4,}}
              />
            </View>

            <View style={styles.centerBottom}>
              <GlassPanel
                radius={26}
                intensity={85}
                tint="light"
                style={{ width: width - 32 }}
              >
                <ContentAnim>
                  <Text style={TITLE}>
                    Entendé los {"\n"}productos de{"\n"}forma simple
                  </Text>
                  <View style={{ height: 12 }} />
                  <Text style={BODY}>
                    Escaneá y aprendé a reconocer los valores nutricionales y
                    beneficios de los alimentos que consumís, de manera práctica
                    y sin complicaciones.
                  </Text>

                  <View style={styles.footerRow}>
                    <TouchableOpacity onPress={handleSkip}>
                      <Text style={SKIP}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.arrowBtnWrap}
                      onPress={handleDone}
                    >
                      <Text style={{ fontSize: 20, color: "#ffffff" }}>➔</Text>
                    </TouchableOpacity>
                  </View>
                </ContentAnim>
              </GlassPanel>
            </View>
          </View>
        ),
        title: "",
        subtitle: "",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <View style={styles.container}>
      {/* Fondo global a pantalla completa */}
      <ImageBackground
        source={require("../../assets/img-onboarding/fondos/fondoOnboarding-1.png")}
        resizeMode="cover"
        style={styles.fullscreenBg}
        pointerEvents="none"
      />

      <Onboarding
        ref={(r) => (swiperRef.current = r)} // callback ref (necesario con esta lib)
        showNext={false}
        showSkip={false}
        showDone={false}
        showPagination={false}
        bottomBarHighlight={false}
        bottomBarHeight={0}
        transitionAnimationDuration={300}
        onSlideChange={onSlideChange}
        containerStyles={styles.swiperContainer}
        imageContainerStyles={styles.swiperImageContainer}
        titleStyles={styles.hidden}
        subTitleStyles={styles.hidden}
        pages={PAGES}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },

  fullscreenBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
  },

  swiperContainer: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
  swiperImageContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
  },
  hidden: { height: 0, opacity: 0 },

  pageWrap: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  cover: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.2,
    marginTop: height * 0.5,
  },
  logo: { width: width, height: height * 0.14, marginBottom: 3 },
  tagline: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowRadius: 3,
  },

  centerBottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.1,
  },
  footerRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowBtnWrap: {
    width: 56,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },

  // Botón “liquid glass” exportado de Figma (250×50 @2x)
  glassButtonWrap: {
    width: 250,
    height: 100, // tu asset @2x (500×100) se verá nítido con contain
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  glassButtonBg: { width: "100%", height: "100%" },
  glassButtonTouch: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  glassButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Figtree-SemiBold",
    marginBottom: 15,
  },
});
