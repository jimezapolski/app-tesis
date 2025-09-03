// constants/theme.js

export const COLORS = {
  text: '#3E5F87',
  logoCeleste: '#70A8F9',
  logoVerde: '#B8D15F',       
  celesteOscuro: '#608EC6',   
  verdeOscuro: '#85A84D',
  verdeMuyOscuro: '#608834',
  verdeClaro: '#EFFAAC',
};

export const FONTS = {
  tituloVerde: {
    fontSize: 30,
    fontFamily: 'Figtree_700Bold',
    color: COLORS.verdeOscuro,
    textAlign: 'center',
  },
  tituloLogoCeleste: {
    fontSize: 32,
    fontFamily: 'Figtree_700Bold',
    color: COLORS.logoCeleste,
    textAlign: 'center',
  },
  subtituloTexto: {
    fontSize: 20,
    fontFamily: 'Figtree_600SemiBold',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtituloTextoCeleste: {
    fontSize: 20,
    fontFamily: 'Figtree_600SemiBold',
    color: COLORS.celesteOscuro,
    textAlign: 'center',
  },
};

// ─────────────────────────────────────────────────────────────
// UI minimal – tokens neutrales para Home/Overlay/Historial/Detalle
export const ui = {
  colors: {
    bg: '#FFFFFF',
    surface: '#F7F8FA',
    text: '#121212',
    textMuted: '#6B7280',
    border: '#EBEEF2',
    card: '#FFFFFF',
    brand: '#0EA5E9',      // CTA principal
    success: '#22C55E',
    warn: '#F59E0B',
    danger: '#EF4444',

    // puente opcional a tu paleta por si querés “brandear”:
    brandAlt: COLORS.logoCeleste,
    accentAlt: COLORS.verdeOscuro,
  },
  spacing: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, xxl: 32 },
  radii: { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 },
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
  },
  type: {
    h1: { fontSize: 22, fontWeight: '800', letterSpacing: -0.2, fontFamily: 'Figtree_700Bold' },
    h2: { fontSize: 18, fontWeight: '800', fontFamily: 'Figtree_700Bold' },
    h3: { fontSize: 16, fontWeight: '700', fontFamily: 'Figtree_600SemiBold' },
    p:  { fontSize: 14, color: '#121212', fontFamily: 'Figtree_400Regular' },
    small: { fontSize: 12, color: '#6B7280', fontFamily: 'Figtree_400Regular' },
  },
};
