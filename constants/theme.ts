/**
 * Sepia Design System — Quant Review
 *
 * Inspired by aged mathematical textbooks, parchment, and scholarly warmth.
 * Every token is intentional: warm backgrounds, terracotta accents,
 * and generous spacing for a focused reading experience.
 */

import { Platform } from 'react-native';

/* ─── Color Palette ──────────────────────────────────────────── */

export const Colors = {
  /** Backgrounds — layered from deepest to most elevated */
  bg: {
    primary:   '#F8F3EC',  // warm parchment (main canvas)
    card:      '#FFFBF5',  // bright warm white (cards)
    elevated:  '#F0E8DC',  // slightly darker (inset areas, solution boxes)
    wash:      '#EDE4D6',  // section dividers, subtle fills
  },

  /** Borders & separators */
  border: {
    subtle:    '#E4D9CA',  // card edges
    medium:    '#D4C5B0',  // section dividers
    strong:    '#BBA98F',  // emphasis borders
  },

  /** Text — warm grays, never pure black */
  text: {
    primary:   '#2C2215',  // headings, key content
    secondary: '#5E4F3D',  // body text
    tertiary:  '#8A7A66',  // labels, captions
    muted:     '#A89880',  // placeholders, disabled
    inverse:   '#FFFBF5',  // text on dark/accent backgrounds
  },

  /** Accents */
  accent: {
    primary:   '#B85C38',  // burnt sienna — main CTA, active states
    primaryBg: '#FCF0EB',  // very light sienna wash
    secondary: '#C99A2E',  // antique gold — badges, highlights
    secondaryBg: '#FBF5E6',
    blue:      '#4A7FB5',  // muted warm blue — links, info
    blueBg:    '#EDF3F9',
    success:   '#5B8A5A',  // sage green
    successBg: '#EEF5EE',
    danger:    '#C44536',  // warm red
    dangerBg:  '#FCEFED',
  },

  /** Special */
  shadow:      '#2C221540', // warm shadow base (with alpha)
  overlay:     '#2C221580',
};

/* ─── Spacing (4px grid) ─────────────────────────────────────── */

export const Spacing = {
  xxs: 2,
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
  xxxl: 64,
};

/* ─── Border Radii ───────────────────────────────────────────── */

export const Radius = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  pill: 9999,
};

/* ─── Typography (Reading-Optimized) ─────────────────────────── */

export const Typography = {
  /** Font families */
  family: {
    regular:   'Inter_400Regular',
    semibold:  'Inter_600SemiBold',
    bold:      'Inter_700Bold',
    extrabold: 'Inter_800ExtraBold',
  },

  /** Preset sizes with line-height ratios tuned for readability */
  size: {
    caption:  { fontSize: 11, lineHeight: 16 },  // 1.45x
    small:    { fontSize: 13, lineHeight: 20 },  // 1.54x
    body:     { fontSize: 15, lineHeight: 24 },  // 1.6x — primary reading size
    bodyLg:   { fontSize: 17, lineHeight: 28 },  // 1.65x — reader mode
    subtitle: { fontSize: 20, lineHeight: 28 },  // 1.4x
    title:    { fontSize: 26, lineHeight: 34 },  // 1.31x
    display:  { fontSize: 36, lineHeight: 44 },  // 1.22x — hero headlines
    hero:     { fontSize: 42, lineHeight: 50 },  // 1.19x — landing page
  },
};

/* ─── Shadows ────────────────────────────────────────────────── */

export const Shadows = Platform.select({
  web: {
    sm: { boxShadow: '0px 1px 3px rgba(44,34,21,0.06)' },
    md: { boxShadow: '0px 3px 8px rgba(44,34,21,0.08)' },
    lg: { boxShadow: '0px 6px 16px rgba(44,34,21,0.12)' },
  },
  default: {
    sm: {
      shadowColor: '#2C2215',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
      elevation: 1,
    },
    md: {
      shadowColor: '#2C2215',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: '#2C2215',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 6,
    },
  },
})!;

/* ─── Layout Constants ───────────────────────────────────────── */

export const Layout = {
  /** Max content width for comfortable reading (~68 characters) */
  maxReadingWidth: 680,
  /** Min touch target size (accessibility) */
  minTouchTarget: 44,
  /** Standard horizontal page padding */
  pagePadding: 20,
};

/* ─── Platform Fonts (for ThemedText, etc.) ──────────────────── */

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
