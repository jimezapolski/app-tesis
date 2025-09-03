import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ui } from '../../constants/theme'; 


export default function ScanOverlayCard({ product, onPressMore, onClose }) {
  const sellos = (product?.sellos ?? [])
    .slice(0, 3)
    .map((s) => (typeof s === 'string' ? s : [s?.tipo, s?.valor].filter(Boolean).join(': ')));

  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: ui.spacing.md }}>
      <View
        style={{
          backgroundColor: 'rgba(17,17,17,0.72)',
          borderRadius: ui.radii.xl,
          padding: ui.spacing.md,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.10)',
        }}
      >
        <Text numberOfLines={2} style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>
          {product?.nombre ?? 'Producto'}
          {product?.marca ? ` — ${product.marca}` : ''}
        </Text>

        {!!sellos.length && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {sellos.map((t, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.14)',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 999,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12 }}>{t}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
          <Pressable
            onPress={onPressMore}
            style={({ pressed }) => ({
              backgroundColor: ui.colors.success,
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 999,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text style={{ color: '#fff', fontWeight: '800' }}>Ver más</Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => ({
              backgroundColor: 'rgba(255,255,255,0.12)',
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 999,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}