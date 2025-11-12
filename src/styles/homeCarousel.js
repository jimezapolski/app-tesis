// styles/homeCarousel.js
import { StyleSheet, Platform } from "react-native";
import { HOME } from "../../constants/theme";

export const carousel = StyleSheet.create({
  list: { marginTop: HOME.spacing.md },
  item: {
    width: 300,
    height: 200,
    borderRadius: HOME.radii.xl,
    overflow: "hidden",
    marginRight: HOME.spacing.lg,
  },
  image: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: HOME.spacing.lg,
    justifyContent: "flex-end",
  },
  chip: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: HOME.radii.pill,
    marginBottom: HOME.spacing.md,
  },
  shadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    android: { elevation: 10 },
  }),
});

export const bottomBar = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: HOME.spacing.xl,
    paddingTop: HOME.spacing.md,
  },
  glassWrap: {
    borderRadius: HOME.radii.xl,
    overflow: "hidden",
  },
  glassGradient: {
    height: 110,
    width: "100%",
  },
  cta: {
    position: "absolute",
    alignSelf: "center",
    width: 350,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Figtree_600SemiBold",
  },
  icon: { fontSize: 18, marginRight: 10, color: "#FFFFFF" },
});
