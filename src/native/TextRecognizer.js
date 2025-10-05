// // src/native/TextRecognizer.js
// import { NativeModules } from "react-native";
// const { TextRecognizer } = NativeModules;


// // ---- OCR nativo (Swift) ----
// export async function recognize(base64) {
//   if (!TextRecognizer) throw new Error("Native TextRecognizer no está linkeado");
//   const lines = await TextRecognizer.recognize(base64);
//   return Array.isArray(lines) ? lines : [];
// }

// // ---- Matcher por Jaccard ----
// const MATCH_THRESHOLD = 0.10; // << ajustá sensibilidad acá

// function normalize(s) {
//   return (s || "")
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/\p{Diacritic}/gu, "")     // quita acentos
//     .replace(/[^a-z0-9]+/gi, " ")       // deja letras/números
//     .trim();
// }

// function tokens(str) {
//   return normalize(str).split(/\s+/).filter(Boolean);
// }

// function jaccard(a, b) {
//   const A = new Set(tokens(a));
//   const B = new Set(tokens(b));
//   if (A.size === 0 || B.size === 0) return 0;
//   let inter = 0;
//   for (const t of A) if (B.has(t)) inter++;
//   return inter / (A.size + B.size - inter);
// }

// // Recibe las líneas del OCR y tu array de productos, devuelve el mejor match o null
// export function matchProductByText(lines, products) {
//   const text = Array.isArray(lines) ? lines.join(" ") : String(lines || "");
//   let best = null, bestScore = 0;

//   for (const p of products) {
//     const hay = [
//       p.marca || p.brand,
//       p.nombre || p.name,
//       ...(p.keywords || []),
//       ...(p.claims || []),
//     ]
//       .filter(Boolean)
//       .join(" ");

//     const score = jaccard(text, hay);
//     if (score > bestScore) {
//       best = p;
//       bestScore = score;
//     }
//   }

//   return bestScore >= MATCH_THRESHOLD ? best : null;
// }

// src/native/TextRecognizer.js
// src/native/TextRecognizer.js
import { NativeModules } from "react-native";

const NativeMod = NativeModules?.TextRecognizer;
export const isNativeReady =
  !!NativeMod && typeof NativeMod.recognize === "function";

/** ---- OCR nativo (Swift) ---- */
export async function recognize(base64) {
  if (!isNativeReady) return [];
  try {
    const lines = await NativeMod.recognize(base64);
    return Array.isArray(lines) ? lines : [];
  } catch {
    return [];
  }
}

/* ============================
   Normalización y tokenización
   ============================ */
const normalize = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9\s]/g, " ")    // deja letras/números/espacios
    .replace(/\s+/g, " ")
    .trim();

const STOP = new Set([
  "de","del","la","las","el","los","y","en","con","sin","para","por","x","a","al",
  "sabor","natural","clasico","classic",
  "g","gr","grs","kg","ml","lt","l","cc","kcal","%","conicet"
]);

const tokenize = (s) =>
  normalize(s)
    .split(" ")
    .filter((t) => t.length >= 3 && !STOP.has(t));

/* ============================
   Métrica (Jaccard + hits)
   ============================ */
function jaccardAndHits(aTokens, bTokens) {
  const A = new Set(aTokens);
  const B = new Set(bTokens);
  const hits = [];
  for (const t of A) if (B.has(t)) hits.push(t);
  const unionSize = new Set([...A, ...B]).size;
  const score = unionSize ? hits.length / unionSize : 0;
  return { score, hits };
}

/* ============================
   Armado de tokens por producto
   ============================ */
function productTokens(p) {
  const parts = [];
  if (p.marca || p.brand) parts.push(p.marca || p.brand);
  if (p.nombre || p.name) parts.push(p.nombre || p.name);
  if (Array.isArray(p.keywords)) parts.push(p.keywords.join(" "));
  if (Array.isArray(p.claims)) parts.push(p.claims.join(" "));
  if (Array.isArray(p.ingredientePositivo))
    parts.push(p.ingredientePositivo.join(" "));
  else if (typeof p.ingredientePositivo === "string")
    parts.push(p.ingredientePositivo);
  return tokenize(parts.join(" "));
}

/* ============================
   Matcher principal
   ============================ */
/**
 * @param {string[]|string} ocrLines
 * @param {Array} products
 * @param {{threshold?:number, minHits?:number}} opts
 * @returns {{product:any|null, score:number, hits:string[]}}
 */
export function matchProductByText(
  ocrLines,
  products,
  { threshold = 0.10, minHits = 2 } = {}
) {
  const textTokens = Array.isArray(ocrLines)
    ? tokenize(ocrLines.join(" "))
    : tokenize(String(ocrLines || ""));

  let best = null;
  let bestScore = 0;
  let bestHits = [];

  for (const p of products || []) {
    const pt = productTokens(p);
    const { score, hits } = jaccardAndHits(textTokens, pt);
    if (score > bestScore && (score >= threshold || hits.length >= minHits)) {
      best = p;
      bestScore = score;
      bestHits = hits.slice().sort((a, b) => b.length - a.length);
    }
  }

  return best
    ? { product: best, score: bestScore, hits: bestHits }
    : { product: null, score: 0, hits: [] };
}

/* ============================
   Util para debug visual
   ============================ */
export function analyzeAgainstAll(ocrLines, products) {
  const textTokens = Array.isArray(ocrLines)
    ? tokenize(ocrLines.join(" "))
    : tokenize(String(ocrLines || ""));
  return (products || []).map((p) => {
    const pt = productTokens(p);
    const { score, hits } = jaccardAndHits(textTokens, pt);
    return { p, score, hits };
  });
}
