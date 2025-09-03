// src/services/products.js
import productsData from '../../assets/data/products.json';

function normalizeProduct(p, fallbackBarcode) {
  if (!p) return null;
  return {
    barcode: String(p.barcode ?? p.codigo ?? p.codigo_barras ?? fallbackBarcode ?? ''),
    nombre: p.nombre ?? p.name ?? 'Producto',
    marca: p.marca ?? p.brand ?? '',
    tamaño: p.tamaño ?? p.size ?? '',
    categoria: p.categoria ?? p.category ?? '',
    sellos: Array.isArray(p.sellos) ? p.sellos : Array.isArray(p.seals) ? p.seals : [],
    ingredientesPositivos: p.ingredientes_positivos ?? p.positive_ingredients ?? [],
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
    foto: p.foto ?? p.image ?? null,
  };
}

export async function getProductByBarcode(barcode) {
  const raw = productsData.find(
    (p) => String(p.barcode ?? p.codigo ?? p.codigo_barras) === String(barcode)
  );
  return normalizeProduct(raw, barcode);
}
