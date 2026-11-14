export const BrandColors = {
  primary: '#0EA5E9',
  primaryDark: '#0369A1',
  primaryLight: '#7DD3FC',
  primarySoft: '#E0F2FE',
  secondary: '#14B8A6',
  secondaryDark: '#0F766E',
  secondaryLight: '#5EEAD4',
} as const;

export const NeutralColors = {
  background: '#081321',
  surface: '#111F30',
  surfaceVariant: '#1C2D42',
  surfaceElevated: '#243950',
  outline: '#475569',
  outlineSubtle: '#26384D',
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  textDisabled: '#64748B',
} as const;

export type BrandColor = keyof typeof BrandColors;
export type NeutralColor = keyof typeof NeutralColors;
