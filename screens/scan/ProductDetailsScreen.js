// screens/scan/ProductDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image } from 'react-native';
import { ui } from '../../constants/theme';                         // ✅ usa ui
import { getProductByBarcode } from '../../src/services/products';

/* ---------- helpers ---------- */
function normalize(p) {
  if (!p) return null;
  return {
    barcode: String(p.barcode ?? p.codigo ?? p.codigo_barras ?? ''),
    nombre: p.nombre ?? p.name ?? 'Producto',
    marca: p.marca ?? p.brand ?? '',
    foto: p.foto ?? p.image ?? null,
    sellos: Array.isArray(p.sellos) ? p.sellos : Array.isArray(p.seals) ? p.seals : [],
    ingredientesPositivos: p.ingredientesPositivos ?? p.positive_ingredients ?? [],
    nutrientes_por_porcion:
      p.nutrientes_por_porcion ??
      p.nutrients_per_portion ?? {
        portion: p.porcion ?? p.portion ?? '100 g',
        azucares_g: p.azucares_g ?? null,
        grasas_saturadas_g: p.grasas_saturadas_g ?? null,
        calorias_kcal: p.calorias_kcal ?? null,
        proteinas_g: p.proteinas_g ?? null,
      },
    nutrienteClave: p.nutrienteClave ?? p.highlight ?? null,
  };
}

function sealToText(s) {
  if (typeof s === 'string') return s;
  if (s && typeof s === 'object') {
    const t = s.tipo ?? s.type ?? '';
    const v = s.valor ?? s.value ?? '';
    return [t, v].filter(Boolean).join(': ');
  }
  return String(s ?? '');
}

function prettyLabel(k) {
  const map = {
    portion: 'Porción',
    azucares_g: 'Azúcares (g)',
    grasas_saturadas_g: 'Grasas saturadas (g)',
    calorias_kcal: 'Calorías (kcal)',
    proteinas_g: 'Proteínas (g)',
  };
  return map[k] ?? k;
}

/* ---------- screen ---------- */
export default function ProductDetailsScreen({ route }) {
  const { barcode, product: initialProduct } = route.params ?? {};
  const [product, setProduct] = useState(() => normalize(initialProduct));
  const [loading, setLoading] = useState(!initialProduct && !!barcode);

  useEffect(() => {
    let mounted = true;
    async function fetchProduct() {
      if (initialProduct || !barcode) return;
      setLoading(true);
      try {
        const found = await getProductByBarcode(String(barcode));
        if (mounted) setProduct(normalize(found));
      } catch {
        if (mounted) setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProduct();
    return () => { mounted = false; };
  }, [barcode, initialProduct]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: ui.colors.surface }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: ui.colors.surface, padding: ui.spacing.lg }}>
        <Text style={ui.type.h3}>No se encontró información</Text>
        {!!barcode && <Text style={[ui.type.small, { marginTop: 6 }]}>Código: {barcode}</Text>}
      </View>
    );
  }

  const seals = (product.sellos ?? []).map(sealToText).filter(Boolean);
  const nutrients = product.nutrientes_por_porcion ?? {};

  return (
    <ScrollView style={{ flex:1, backgroundColor: ui.colors.surface }}>
      <View style={{ padding: ui.spacing.lg }}>
        {/* Card principal */}
        <View style={[
          {
            backgroundColor: ui.colors.card,
            borderRadius: ui.radii.xl,
            padding: ui.spacing.lg,
            borderWidth: 1, borderColor: ui.colors.border,
          },
          ui.shadow.card
        ]}>
          {/* Título */}
          <Text style={[ui.type.h1, { marginBottom: ui.spacing.xs }]}>
            {product.nombre || '—'}{product.marca ? ` — ${product.marca}` : ''}
          </Text>
          <Text style={[ui.type.small, { marginBottom: ui.spacing.md }]}>
            Código: {product.barcode || barcode}
          </Text>

          {/* Imagen (si hay) */}
          {!!product.foto && (
            <Image
              source={{ uri: product.foto }}
              style={{
                width: '100%', height: 180, resizeMode: 'contain',
                borderRadius: ui.radii.md, backgroundColor: ui.colors.surface, marginBottom: ui.spacing.md
              }}
            />
          )}

          {/* Sellos */}
          <Text style={[ui.type.h2, { marginBottom: ui.spacing.sm }]}>Sellos</Text>
          {seals.length ? (
            <View style={{ flexDirection:'row', flexWrap:'wrap', gap: 8, marginBottom: ui.spacing.md }}>
              {seals.map((t, i) => {
                const l = t.toLowerCase();
                const bg = l.includes('exceso') ? '#FEE2E2' : l.includes('alto') ? '#FEF3C7' : '#E5E7EB';
                const fg = l.includes('exceso') ? ui.colors.danger : l.includes('alto') ? ui.colors.warn : '#374151';
                return (
                  <View key={i} style={{ backgroundColor: bg, paddingVertical:6, paddingHorizontal:10, borderRadius: ui.radii.pill }}>
                    <Text style={{ fontSize:12, fontWeight:'700', color: fg }}>{t}</Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text style={[ui.type.p, { marginBottom: ui.spacing.md }]}>Sin sellos</Text>
          )}

          {/* Nutriente clave */}
          {!!product.nutrienteClave && (
            <>
              <Text style={[ui.type.h2, { marginBottom: ui.spacing.sm }]}>Nutriente clave</Text>
              <View style={{ backgroundColor:'#E0F2FE', paddingVertical:6, paddingHorizontal:10, borderRadius: ui.radii.pill, alignSelf:'flex-start', marginBottom: ui.spacing.md }}>
                <Text style={{ fontSize:12, fontWeight:'700', color:'#0369A1' }}>
                  {String(product.nutrienteClave)}
                </Text>
              </View>
            </>
          )}

          {/* Ingredientes positivos */}
          <Text style={[ui.type.h2, { marginBottom: ui.spacing.sm }]}>Ingredientes positivos</Text>
          {(product.ingredientesPositivos ?? []).length ? (
            (product.ingredientesPositivos ?? []).map((ing, i) => (
              <Text key={i} style={[ui.type.p, { marginBottom: 4 }]}>• {String(ing)}</Text>
            ))
          ) : (
            <Text style={[ui.type.p, { marginBottom: ui.spacing.md }]}>No informado</Text>
          )}

          {/* Nutrientes por porción */}
          <Text style={[ui.type.h2, { marginTop: ui.spacing.md, marginBottom: ui.spacing.sm }]}>
            Nutrientes por porción
          </Text>
          {Object.keys(nutrients).length ? (
            Object.entries(nutrients).map(([k, v]) => (
              <View
                key={k}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: ui.colors.border,
                }}
              >
                <Text style={ui.type.p}>{prettyLabel(k)}</Text>
                <Text style={ui.type.p}>{v ?? '—'}</Text>
              </View>
            ))
          ) : (
            <Text style={ui.type.p}>No informado</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
