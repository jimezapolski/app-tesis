// src/services/history.js
// Historial local con AsyncStorage + pub/sub

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'scanHistory:v1';
const DEFAULT_LIMIT = 50;

// --- Pub/Sub mínimo ---
const listeners = new Set();
function notify(updatedList) {
  for (const fn of listeners) {
    try { fn(updatedList); } catch {}
  }
}

// Normaliza un producto al shape del historial (usa español)
function toHistoryItem(p) {
  if (!p) return null;
  const item = {
    barcode: String(p.barcode ?? p.codigo ?? p.codigo_barras ?? ''),
    name: p.nombre ?? p.name ?? 'Producto',   // solo para mostrar en la lista
    brand: p.marca ?? p.brand ?? '',
    nutrientKey: p.nutrienteClave ?? p.highlight ?? null,
    stamps: p.sellos ?? p.seals ?? null,
    productSnapshot: {
      nombre: p.nombre ?? p.name ?? 'Producto',
      marca: p.marca ?? p.brand ?? '',
      foto: p.foto ?? p.image ?? null,
      sellos: Array.isArray(p.sellos) ? p.sellos : Array.isArray(p.seals) ? p.seals : [],
      nutrienteClave: p.nutrienteClave ?? p.highlight ?? null,
    },
    ts: new Date().toISOString(),
  };
  if (!item.barcode) return null;
  return item;
}

async function readRaw() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('[history] read error', e);
    return [];
  }
}

async function writeRaw(list) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    notify(list);
    return list;
  } catch (e) {
    console.warn('[history] write error', e);
    return list;
  }
}

// --- API pública ---

export async function getHistory() {
  return await readRaw();
}

export async function addToHistory(product, limit = DEFAULT_LIMIT) {
  const item = toHistoryItem(product);
  if (!item) return await readRaw();

  const list = await readRaw();
  const idx = list.findIndex((x) => x.barcode === item.barcode);
  if (idx !== -1) list.splice(idx, 1);        // idempotente → mueve al tope
  const next = [item, ...list].slice(0, limit);
  return await writeRaw(next);
}

export async function removeFromHistory(barcode) {
  const list = await readRaw();
  const next = list.filter((x) => x.barcode !== String(barcode));
  return await writeRaw(next);
}

export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('[history] clear error', e);
  }
  notify([]);
  return [];
}

export function subscribeHistory(listener) {
  listeners.add(listener);
  // emitir estado actual al suscribir
  getHistory().then((list) => {
    try { listener(list); } catch {}
  });
  return () => listeners.delete(listener);
}
