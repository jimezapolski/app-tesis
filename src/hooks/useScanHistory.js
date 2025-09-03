// src/hooks/useScanHistory.js
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  addToHistory,
  getHistory,
  removeFromHistory,
  clearHistory,
  subscribeHistory,
} from '../services/history';

export function useHistoryList() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const unsub = subscribeHistory(setHistory);
    return () => unsub();
  }, []);

  const refresh = useCallback(async () => {
    const list = await getHistory();
    setHistory(list);
  }, []);

  const remove = useCallback(async (barcode) => {
    const list = await removeFromHistory(barcode);
    setHistory(list);
  }, []);

  const clear = useCallback(async () => {
    const list = await clearHistory();
    setHistory(list);
  }, []);

  return { history, refresh, remove, clear };
}

export function useAutoSaveScan({
  product,
  enabled = true,
  cooldownMs = 5000,
  onSaved,
} = {}) {
  const lastRef = useRef({ barcode: null, ts: 0 });

  useEffect(() => {
    if (!enabled || !product?.barcode) return;

    const now = Date.now();
    const barcode = String(product.barcode);
    const same = lastRef.current.barcode === barcode;
    const within = now - lastRef.current.ts < cooldownMs;
    if (same && within) return;

    addToHistory(product).then((list) => {
      lastRef.current = { barcode, ts: now };
      if (onSaved) {
        try { onSaved(list?.[0]); } catch {}
      }
    });
  }, [product?.barcode, enabled, cooldownMs, onSaved, product]);
}

export function useScanHistoryActions() {
  const save = useCallback(async (product) => addToHistory(product), []);
  const remove = useCallback(async (barcode) => removeFromHistory(barcode), []);
  const clear = useCallback(async () => clearHistory(), []);
  return { save, remove, clear };
}
