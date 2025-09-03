// src/services/products.js
import products from "../../assets/data/products.json";

function normalize(p) {
  if (!p) return null;
  return {
    // nombres
    name: p.name ?? p.nombre ?? "Producto",
    brand: p.brand ?? p.marca ?? "",
    size: p.size ?? p.tamano ?? p.tamaño ?? "",
    category: p.category ?? p.categoria ?? "",

    // arrays
    seals: p.seals ?? p.sellos ?? [],
    positive_ingredients: p.positive_ingredients ?? p.ingredientes_positivos ?? [],

    // nutrientes (objeto)
    nutrients_per_portion:
      p.nutrients_per_portion ??
      p.nutrientes_por_porcion ??
      {
        portion: p.portion ?? "100 g",
        azucares_g: p.azucares_g ?? null,
        grasas_saturadas_g: p.grasas_saturadas_g ?? null,
        calorias_kcal: p.calorias_kcal ?? null,
        proteinas_g: p.proteinas_g ?? null,
      },

    // barcode
    barcode: String(p.barcode ?? p.codigo ?? p.codigo_barras ?? ""),
  };
}

export async function getProductByBarcode(barcode) {
  const raw = products.find(
    (p) => String(p.barcode ?? p.codigo ?? p.codigo_barras) === String(barcode)
  );
  const normalized = normalize(raw);
  if (!normalized) throw new Error("PRODUCT_NOT_FOUND");
  return normalized;
}
