// /screens/history/HistoryScreen.js
import React, { useCallback } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ui } from '../../constants/theme';                
import { useHistoryList } from '../../src/hooks/useScanHistory';

// helper igual que antes
function formatNutrientKey(nk) {
  if (!nk) return null;
  if (typeof nk === 'string') return nk;
  if (Array.isArray(nk)) return nk.map(formatNutrientKey).filter(Boolean).join(', ');
  if (typeof nk === 'object') {
    const t = nk.tipo ?? nk.type ?? '';
    const v = nk.valor ?? nk.value ?? '';
    return [t, v].filter(Boolean).join(': ') || '[dato]';
  }
  return String(nk);
}
function formatDate(iso) {
  try {
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
  } catch { return iso; }
}

export default function HistoryScreen() {
  const { history, remove, clear } = useHistoryList();
  const navigation = useNavigation();

  const onClearAll = useCallback(() => {
    Alert.alert('Limpiar historial','¿Querés eliminar todos los elementos del historial?',[
      { text:'Cancelar', style:'cancel' },
      { text:'Eliminar', style:'destructive', onPress: () => clear() },
    ]);
  }, [clear]);

  const onRemove = useCallback((barcode) => {
    Alert.alert('Eliminar elemento','¿Eliminar este producto del historial?',[
      { text:'Cancelar', style:'cancel' },
      { text:'Eliminar', style:'destructive', onPress: () => remove(barcode) },
    ]);
  }, [remove]);

  const renderItem = ({ item }) => {
    const title = (item.name ?? 'Producto') + (item.brand ? ` — ${item.brand}` : '');
    const nk = formatNutrientKey(item.nutrientKey);

    return (
      <Pressable
        onPress={() => navigation.navigate('ProductDetails', {
          barcode: item.barcode,
          product: item.productSnapshot,
        })}
        style={({ pressed }) => ({
          opacity: pressed ? 0.9 : 1,
          marginHorizontal: ui.spacing.lg,
          marginTop: ui.spacing.md,
          backgroundColor: ui.colors.card,
          borderRadius: ui.radii.lg,
          borderWidth: 1,
          borderColor: ui.colors.border,
          paddingVertical: 12,
          paddingHorizontal: 14,
          ...ui.shadow.card,
        })}
      >
        <Text numberOfLines={1} style={{ fontSize:16, fontWeight:'700', color: ui.colors.text }}>
          {title}
        </Text>
        <Text style={{ fontSize:12, color: ui.colors.textMuted, marginTop: 4 }}>
          {formatDate(item.ts)} · {item.barcode}
        </Text>
        {nk ? (
          <Text style={{ fontSize:12, color: ui.colors.text, marginTop: 4 }}>
            Clave: {nk}
          </Text>
        ) : null}

        <Pressable
          onPress={() => onRemove(item.barcode)}
          hitSlop={10}
          style={({ pressed }) => ({
            position: 'absolute', right: 12, top: 12,
            backgroundColor: pressed ? '#FEE2E2' : '#FFF',
            borderColor: ui.colors.border, borderWidth: 1,
            borderRadius: ui.radii.sm, paddingVertical: 6, paddingHorizontal: 10,
          })}
        >
          <Text style={{ fontSize:12, fontWeight:'700', color: ui.colors.danger }}>Eliminar</Text>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: ui.colors.surface }}>
      <View style={{
        paddingHorizontal: ui.spacing.lg,
        paddingVertical: ui.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: ui.colors.border,
        backgroundColor: ui.colors.card,
      }}>
        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
          <Text style={{ fontSize:18, fontWeight:'800' }}>Historial</Text>
          {history.length > 0 && (
            <Pressable
              onPress={onClearAll}
              hitSlop={10}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                paddingVertical: 8, paddingHorizontal: 12,
                borderRadius: ui.radii.md,
                borderWidth: 1, borderColor: ui.colors.border,
                backgroundColor: ui.colors.card,
              })}
            >
              <Text style={{ fontSize:12, fontWeight:'700', color: ui.colors.text }}>Limpiar todo</Text>
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.barcode + '_' + item.ts}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: ui.spacing.xl }}
        style={{ backgroundColor: ui.colors.surface }}
        ListEmptyComponent={
          <View style={{ alignItems:'center', padding: ui.spacing.xl }}>
            <Text style={{ fontSize:16, fontWeight:'600', color: ui.colors.text }}>Aún no hay historial</Text>
            <Text style={{ fontSize:13, color: ui.colors.textMuted, marginTop: 4 }}>
              Escaneá un producto para verlo acá.
            </Text>
          </View>
        }
      />

      <View style={{
        padding: ui.spacing.lg,
        borderTopWidth: 1, borderTopColor: ui.colors.border,
        backgroundColor: ui.colors.card,
      }}>
        <Text style={{ fontSize:12, color: ui.colors.textMuted }}>
          Tus escaneos se guardan <Text style={{ fontWeight:'700', color: ui.colors.text }}>solo en este dispositivo</Text> (sin sincronización).
        </Text>
      </View>
    </SafeAreaView>
  );
}
