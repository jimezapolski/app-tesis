function tokens(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/).filter(Boolean);
  }
  function jaccard(aText, bText) {
    const A = new Set(tokens(aText)), B = new Set(tokens(bText));
    let inter = 0; for (const t of A) if (B.has(t)) inter++;
    return inter / Math.max(1, A.size + B.size - inter);
  }
  export function matchProductByText(lines, products) {
    const text = Array.isArray(lines) ? lines.join(" ") : String(lines || "");
    let best = null, bestScore = 0;
    for (const p of products) {
      const hay = [p.brand, p.name, ...(p.keywords || [])].filter(Boolean).join(" ");
      const score = jaccard(text, hay);
      if (score > bestScore) { best = p; bestScore = score; }
    }
    return bestScore >= 0.18 ? best : null; // umbral simple
  }
  