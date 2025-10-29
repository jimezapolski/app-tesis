// src/components/FancyIllus.jsx
import React, { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

/**
 * Ilustración con animaciones sutiles:
 * - Flotación vertical (loop)
 * - “Respiración” (scale) sincronizada
 * - Feedback al toque (scale down)
 */
export default function FancyIllus({
  source,
  style,
  width = 180,
  height = 140,
  float = 8,              // amplitud de flotación (px)
  scaleMin = 0.98,        // escala mínima en la respiración
  duration = 2600,        // duración del ciclo (ms)
  delay = 120,            // retardo inicial (ms)
  onPress,                // opcional
}) {
  const floatAnim = useRef(new Animated.Value(0)).current;   // 0..1
  const pressAnim = useRef(new Animated.Value(0)).current;   // 0 (normal) -> 1 (pressed)

  // Bucle de flotación + respiración
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration, delay, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatAnim, duration, delay]);

  // Interpolaciones
  const translateY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [float, -float] });
  const breathe    = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [1, scaleMin] });

  const pressedScale = pressAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] });

  const transform = [
    { translateY },
    { scale: Animated.multiply(breathe, pressedScale) },
  ];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => Animated.spring(pressAnim, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 0 }).start()}
      onPressOut={() => Animated.spring(pressAnim, { toValue: 0, useNativeDriver: true, speed: 20, bounciness: 0 }).start()}
      style={{ width, height }}
      android_ripple={{ color: "transparent" }}
    >
      <Animated.Image
        source={source}
        resizeMode="contain"
        style={[{ width: "100%", height: "100%", transform }, style]}
      />
    </Pressable>
  );
}
