// import React, { useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
//   Animated,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import Onboarding from "react-native-onboarding-swiper";
// import { COLORS, FONTS } from "../../constants/theme";
// import { useNavigation } from "@react-navigation/native";
// import { setItem }from "../../src/utils/asyncStorage";

// const { width, height } = Dimensions.get("window");

// export default function OnBoardingScreen() {
//   const navigation = useNavigation();
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   const handleDone = () => {
//     navigation.navigate("Home");
//     setItem("onboarded", "1");
//   };

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       delay: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Onboarding
//         onDone={handleDone}
//         onSkip={handleDone}
//         pages={[
//           {
//             backgroundColor: "transparent",
//             image: (
//               <ImageBackground
//                 source={require("../../assets/img-onboarding/fondos/fondoOnboarding-1.png")}
//                 style={styles.imageBackground}
//                 resizeMode="cover"
//               >
//                 <View style={styles.overlay}>
//                    <Image
//                     style={styles.heroLogo}
//                     source={require("../../assets/logo.png")}
//                     resizeMode="contain"
//                   />
//                   <Animated.Text
//                     style={[styles.onboardingTitle, { opacity: fadeAnim }]}
//                   >
//                     El camino para empoderar tu nutrición
//                   </Animated.Text>
//                 </View>
//               </ImageBackground>
//             ),
//             title: "",
//             subtitle: "",
//           },
//           {
//             backgroundColor: "transparent",
//             image: (
//               <ImageBackground
//                 source={require("../../assets/img-onboarding/fondos/fondoOnboarding-2.png")}
//                 style={styles.imageBackground}
//                 resizeMode="cover"
//               >
//                 <Animated.Text
//                   style={[styles.onboardingTitleVerde, { opacity: fadeAnim }]}
//                 >
//                   La alimentación es parte de tu bienestar
//                 </Animated.Text>

//                 <View style={styles.overlay}>
//                    <Image
//                     style={styles.heroImage}
//                     source={require("../../assets/img-onboarding/onboarding2.png")}
//                     resizeMode="contain"
//                   />
//                 </View>
//                 <Text style={styles.subtituloAzul}>
//                   Acá vas a encontrar información clara sobre los alimentos, sin
//                   confusión ni miedo, para que tomes decisiones que realmente te
//                   sirvan
//                 </Text>
//               </ImageBackground>
//             ),
//             title: "",
//             subtitle: "",
//           },
//           {
//             backgroundColor: "transparent",
//             image: (
//               <ImageBackground
//                 source={require("../../assets/img-onboarding/fondos/fondoOnboarding-3.png")}
//                 style={styles.imageBackground}
//                 resizeMode="cover"
//               >
//                 <Text style={styles.onboardingTitleAzul}>
//                   No se trata de eliminar alimentos, sino de entenderlos
//                 </Text>
//                 <View style={styles.overlay}>
//                  <Image
//                     style={styles.heroImage}
//                     source={require("../../assets/img-onboarding/onboarding3.png")}
//                     resizeMode="contain"
//                   />
//                 </View>
//                 <Text style={styles.subtituloVerde}>
//                   La clave es conocer qué te aporta cada producto y cómo
//                   incorporarlo de forma consciente
//                 </Text>
//               </ImageBackground>
//             ),
//             title: "",
//             subtitle: "",
//           },
//           {
//             backgroundColor: "transparent",
//             image: (
//               <ImageBackground
//                 source={require("../../assets/img-onboarding/fondos/fondoOnboarding-4.png")}
//                 style={styles.imageBackground}
//                 resizeMode="cover"
//               >
//                 <Text style={styles.onboardingTitleVerde}>Escaneá y aprendé</Text>
//                 <View style={styles.overlay}>
//                   <Image
//                     style={styles.heroImage}
//                     source={require("../../assets/img-onboarding/onboarding4.png")}
//                     resizeMode="contain"
//                   />
//                 </View>
//                 <Text style={styles.subtituloAzul}>
//                   Con esta función podés escanear un producto y recibir
//                   información en tiempo real sobre su valor nutricional y sus
//                   beneficios
//                 </Text>
//               </ImageBackground>
//             ),
//             title: "",
//             subtitle: "",
//           },
//         ]}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#8FD16C",
//     justifyContent: "center",
//   },
//   imageBackground: {
//     width,
//     height,
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   heroLogo: {
//     width,
//     height: height * 0.12,
//     position: "absolute",
//     top: height * 0.45,
//   },
//   heroImage: {
//     width,
//     height: height * 0.25,
//     alignSelf: "center",
//     marginBottom: 10,
//   },
//   onboardingTitle: {
//     marginTop: height * 0.2,
//     fontSize: 20,
//     fontFamily: FONTS.subtituloTexto.fontFamily,
//     color: COLORS.text,
//     textAlign: "center",
//   },
//   onboardingTitleVerde: {
//     paddingHorizontal: 18,
//     fontSize: 28,
//     fontFamily: FONTS.subtituloTexto.fontFamily,
//     color: COLORS.verdeOscuro,
//     textAlign: "center",
//     marginTop: height * 0.3,
//   },
//   onboardingTitleAzul: {
//     paddingHorizontal: 18,
//     fontSize: 28,
//     fontFamily: FONTS.subtituloTexto.fontFamily,
//     color: COLORS.text,
//     textAlign: "center",
//     marginTop: height * 0.3,
//   },
//   subtituloAzul: {
//     paddingHorizontal: 18,
//     marginBottom: height * 0.2,
//     fontSize: 18,
//     fontFamily: FONTS.subtituloTexto.fontFamily,
//     color: COLORS.text,
//     textAlign: "center",
//   },
//   subtituloVerde: {
//     paddingHorizontal: 18,
//     marginBottom: height * 0.2,
//     fontSize: 18,
//     fontFamily: FONTS.subtituloTexto.fontFamily,
//     color: COLORS.verdeOscuro,
//     textAlign: "center",
//   },
// });

// src/screens/onboarding/OnBoardingScreen.jsx
import React, { useRef, useEffect, useState } from "react";
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

const { width, height } = Dimensions.get("window");

export default function OnBoardingScreen() {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(1)).current;

  const handleDone = () => {
    setItem("onboarded", "1");
    navigation.replace("Home");
  };
  const handleSkip = () => {
    setItem("onboarded", "1");
    navigation.replace("Home");
  };
  const goNext = () => {
    const lastIdx = 3;
    if (index < lastIdx) {
      swiperRef.current?.goToPage?.(index + 1, true);
    } else {
      handleDone();
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const onSlideChange = (i) => {
    setIndex(i);
    slideAnim.setValue(0);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 380,
      useNativeDriver: true,
    }).start();
  };

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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img-onboarding/fondos/fondoOnboarding-1.png")}
        resizeMode="cover"
        style={styles.fullscreenBg}
        pointerEvents="none"
      />

      <Onboarding
        ref={swiperRef}
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
        pages={[
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

                  <View style={{ height: 24 }} />
                  <TouchableOpacity style={styles.button} onPress={goNext}>
                    <Text style={styles.buttonText}>Comenzar</Text>
                  </TouchableOpacity>
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
                <View style={{ alignItems: "center", marginTop: 56, marginBottom: 8 }}>
                  <Image
                    source={require("../../assets/img-onboarding/illus-heart.png")}
                    style={{ width: 160, height: 120, marginTop: 220 }}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.centerBottom}>
                  <GlassPanel radius={26} intensity={85} tint="light" style={{ width: width - 32 }}>
                    <ContentAnim>
                      <Text style={TITLE}>La alimentación{"\n"}es parte de tu{"\n"}bienestar</Text>
                      <View style={{ height: 12 }} />
                      <Text style={BODY}>
                        Acá vas a encontrar información clara sobre los alimentos,
                        sin confusión ni miedo, para que tomes decisiones que realmente te sirvan.
                      </Text>

                      <View style={styles.footerRow}>
                        <TouchableOpacity onPress={handleSkip}>
                          <Text style={SKIP}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowBtnWrap} onPress={goNext}>
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
                <View style={{ alignItems: "center", marginTop: 56, marginBottom: 8 }}>
                  <Image
                    source={require("../../assets/img-onboarding/illus-option.png")}
                    style={{ width: 140, height: 112, marginTop: 230 }}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.centerBottom}>
                  <GlassPanel radius={26} intensity={85} tint="light" style={{ width: width - 32 }}>
                    <ContentAnim>
                      <Text style={TITLE}>Comer bien no{"\n"}tiene que ser{"\n"}complicado</Text>
                      <View style={{ height: 12 }} />
                      <Text style={BODY}>
                        La app te ayuda a entender qué te aporta cada producto y cómo incorporarlo
                        de forma consciente, para que tu alimentación sea simple y funcional para vos.
                      </Text>

                      <View style={styles.footerRow}>
                        <TouchableOpacity onPress={handleSkip}>
                          <Text style={SKIP}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowBtnWrap} onPress={goNext}>
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
                <View style={{ alignItems: "center", marginTop: 56, marginBottom: 8 }}>
                  <Image
                    source={require("../../assets/img-onboarding/illus-scanner.png")}
                    style={{ width: 180, height: 140, marginTop: 210 }}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.centerBottom}>
                  <GlassPanel radius={26} intensity={85} tint="light" style={{ width: width - 32 }}>
                    <ContentAnim>
                      <Text style={TITLE}>Entendé los productos{"\n"}de forma simple{"\n"}y consciente</Text>
                      <View style={{ height: 12 }} />
                      <Text style={BODY}>
                        Escaneá los productos y descubrí su valor nutricional, sus beneficios y
                        cómo sumarlos de forma consciente a tu alimentación.
                      </Text>

                      <View style={styles.footerRow}>
                        <TouchableOpacity onPress={handleSkip}>
                          <Text style={SKIP}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowBtnWrap} onPress={handleDone}>
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
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },

  // 👉 Fondo global absoluto a pantalla completa
  fullscreenBg: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    width, height,
  },

  // Forzamos que el contenedor del swiper no añada rellenos
  swiperContainer: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
  // 👉 Esto hace que la “zona de imagen” del swiper ocupe toda la pantalla
  swiperImageContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
  },
  // Oculta espacios reservados de título/subtítulo del componente
  hidden: { height: 0, opacity: 0 },

  // Contenido de cada página
  pageWrap: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  // Slide 1
  cover: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.35,
  },
  logo: { width: width * 0.6, height: height * 0.12 },
  tagline: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowRadius: 3,
  },
  button: {
    minWidth: 180,
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",   
  },
  buttonText: {
    color: "#0B1422",
    fontSize: 16,
    fontFamily: "Figtree-SemiBold",
  },

  // Slides 2–4
  centerBottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.10,
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
});
