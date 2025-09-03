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
import { useHistoryList } from '../../src/hooks/useScanHistory'; // ✅

/** ---- Helpers ---- */
function formatDate(iso) {
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString(undefined, {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
    const time = d.toLocaleTimeString(undefined, {
      hour: '2-digit', minute: '2-digit',
    });
    return `${date} ${time}`;
  } catch {
    return iso;
  }
}

// ✅ Convierte nutrientKey (string | objeto | array) a texto seguro para <Text>
function formatNutrientKey(nk) {
  if (!nk) return null;
  if (typeof nk === 'string') return nk;
  if (Array.isArray(nk)) {
    return nk.map(formatNutrientKey).filter(Boolean).join(', ');
  }
  if (typeof nk === 'object') {
    const t = nk.tipo ?? nk.type ?? '';
    const v = nk.valor ?? nk.value ?? '';
    return [t, v].filter(Boolean).join(': ') || '[dato]';
  }
  return String(nk);
}

function EmptyState() {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:24 }}>
      <Text style={{ fontSize:18, fontWeight:'600', marginBottom:8 }}>
        Aún no hay historial
      </Text>
      <Text style={{ fontSize:14, color:'#666', textAlign:'center' }}>
        Escaneá un producto para guardarlo aquí y acceder rápido a su detalle.
      </Text>
    </View>
  );
}

/** ---- Screen ---- */
export default function HistoryScreen() {
  const { history, remove, clear } = useHistoryList();
  const navigation = useNavigation();

  const onClearAll = useCallback(() => {
    Alert.alert(
      'Limpiar historial',
      '¿Querés eliminar todos los elementos del historial?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => clear() },
      ]
    );
  }, [clear]);

  const onRemove = useCallback((barcode) => {
    Alert.alert(
      'Eliminar elemento',
      '¿Eliminar este producto del historial?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => remove(barcode) },
      ]
    );
  }, [remove]);

  const renderItem = ({ item }) => {
    const title = (item.name ?? 'Producto') + (item.brand ? ` — ${item.brand}` : '');
    const nk = formatNutrientKey(item.nutrientKey);

    return (
      <Pressable
        onPress={() =>
          navigation.navigate('ProductDetails', {
            barcode: item.barcode,
            product: item.productSnapshot, // snapshot para mostrar sin esperar fetch
          })
        }
        accessibilityRole="button"
        style={({ pressed }) => ({
          opacity: pressed ? 0.8 : 1,
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 56,
        })}
      >
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 4 }}
          >
            {title}
          </Text>

          <Text style={{ fontSize: 12, color: '#666' }}>
            {formatDate(item.ts)} · {item.barcode}
          </Text>

          {nk ? (
            <Text style={{ fontSize: 12, color: '#444', marginTop: 2 }}>
              Clave: {nk}
            </Text>
          ) : null}
        </View>

        <Pressable
          onPress={() => onRemove(item.barcode)}
          accessibilityRole="button"
          accessibilityLabel="Eliminar del historial"
          hitSlop={12}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#eee',
            backgroundColor: '#fafafa',
            minWidth: 44, minHeight: 44,
            alignItems: 'center', justifyContent: 'center',
          })}
        >
          <Text style={{ fontSize: 12, color: '#b00020', fontWeight: '700' }}>Eliminar</Text>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{
        paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee',
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Text style={{ fontSize: 18, fontWeight: '800' }}>Historial</Text>
        {history.length > 0 && (
          <Pressable
            onPress={onClearAll}
            accessibilityRole="button"
            hitSlop={10}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              paddingVertical: 8, paddingHorizontal: 12,
              borderRadius: 10,
              borderWidth: 1, borderColor: '#eee', backgroundColor: '#fafafa'
            })}
          >
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#333' }}>Limpiar todo</Text>
          </Pressable>
        )}
      </View>

      {history.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.barcode + '_' + item.ts}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}

      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 12, color: '#666' }}>
          Tus escaneos se guardan <Text style={{ fontWeight: '700' }}>solo en este dispositivo</Text> (sin sincronización).
        </Text>
      </View>
    </SafeAreaView>
  );
}
