// components/QuickLinkCard.jsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { HOME } from "../../constants/theme";

export default function QuickLinkCard({
  title,
  subtitle,
  onPress,
  SvgIcon,
  iconBg = "#70A8F9",
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        backgroundColor: HOME.colors.glass,
        borderRadius: HOME.radii.xl,
        padding: HOME.spacing.lg,
        borderWidth: 1,
        borderColor: HOME.colors.glassBorder,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* Icono */}
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          backgroundColor: iconBg,
          alignItems: "center",
          justifyContent: "center",
          marginRight: HOME.spacing.md,
        }}
      >
        {/* Soportar 3 casos: componente SVG, require() numérico, y pngSource explícito */}
        {typeof SvgIcon === "function" ? (
          <SvgIcon width={28} height={28} fill="#608EC6" color="#608EC6" />
        ) : pngSource ? (
          <Image source={pngSource} style={{ width: 28, height: 28 }} />
        ) : typeof SvgIcon === "number" ? (
          <Image source={SvgIcon} style={{ width: 28, height: 28 }} />
        ) : null}
      </View>

      {/* Textos */}
      <View style={{ flex: 1 }}>
        <Text style={HOME.type.quickTitle16}>{title}</Text>
        <Text
          style={[HOME.type.quickBody12, { marginTop: 6 }]}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
