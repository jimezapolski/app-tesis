export const levels = {
    sugar: { low: 5, high: 22.5 }, // g cada 100g
    salt:  { low: 0.3, high: 1.5 }, // g cada 100g
    fat:   { low: 3, high: 17.5 }, // g cada 100g
  };
  
  export function band(v, { low, high }) {
    if (v == null) return null;
    if (v < low) return "low";
    if (v > high) return "high";
    return "med";
  }
  
  export function bandColor(b) {
    return b === "low" ? "#2ecc71" : b === "high" ? "#e74c3c" : "#f1c40f";
  }
  export const humanBand = b => (b === "low" ? "Bajo" : b === "high" ? "Alto" : "Medio");
  