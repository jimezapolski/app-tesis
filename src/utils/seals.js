// src/utils/seals.js

// Diccionario base (Argentina – Ley de Etiquetado Frontal)
const DICT = {
    "Exceso en azúcares": {
      breve: "Tiene azúcares añadidos por encima del límite para este tipo de alimento.",
      guia: "Preferí porciones pequeñas y combiná con alimentos con fibra o proteínas para evitar picos de energía."
    },
    "Exceso en grasas saturadas": {
      breve: "Supera el límite de grasas saturadas por porción establecido por la norma.",
      guia: "Reservá su consumo para ocasiones y equilibrá el plato con frutas, verduras o lácteos magros."
    },
    "Exceso en grasas totales": {
      breve: "Aporta más grasas de las recomendadas por porción.",
      guia: "Priorizá porciones moderadas y elegí preparaciones con menor agregado de aceites."
    },
    "Exceso en sodio": {
      breve: "El contenido de sodio excede el umbral definido por la ley.",
      guia: "Combiná con alimentos frescos bajos en sodio y evitá sumar sal extra en la comida."
    },
    "Exceso en calorías": {
      breve: "Concentra más energía por porción que lo recomendado.",
      guia: "Ajustá el tamaño de porción y compensá con opciones frescas en el resto del día."
    },
    "Contiene edulcorantes": {
      breve: "Incluye edulcorantes no calóricos o calóricos.",
      guia: "No se recomienda su consumo habitual en niños. En adultos, moderación y variedad."
    },
    "Contiene cafeína": {
      breve: "Incluye cafeína agregada.",
      guia: "Evitar en niños, embarazadas y personas sensibles a estimulantes."
    }
  };
  
  /**
   * Devuelve un texto corto explicando por qué están los sellos del producto.
   * Usa el diccionario y, si existiesen datos en tablaResumida/nutrienteClave, los menciona.
   */
  export function explainSeals(product = {}) {
    const sellos = Array.isArray(product.sellos) ? product.sellos : [];
    if (!sellos.length) return null;
  
    const partes = sellos.map((sello) => {
      const base = DICT[sello];
      if (!base) return `• ${sello}.`;
      return `• ${sello}: ${base.breve}`;
    });
  
    // Apoyo con guía práctica (una sola línea al final)
    const guias = sellos
      .map((sello) => DICT[sello]?.guia)
      .filter(Boolean);
  
    const guiaUnificada = guias.length
      ? `\nConsejo: ${fusionarGuias(guias)}`
      : "";
  
    // Si hay un nutriente clave, lo mencionamos suavemente
    let notaNutriente = "";
    if (product?.nutrienteClave?.tipo && product?.nutrienteClave?.valor) {
      notaNutriente = `\nDato clave: ${product.nutrienteClave.tipo} = ${product.nutrienteClave.valor}.`;
    }
  
    return `${partes.join("\n")}${guiaUnificada}${notaNutriente}`;
  }
  
  function fusionarGuias(guias) {
    // Elige 1–2 guías distintas y las combina en una frase breve
    const únicas = Array.from(new Set(guias));
    if (únicas.length === 1) return únicas[0];
    return `${únicas[0]} ${únicas[1] ? " " + únicas[1] : ""}`;
  }
  