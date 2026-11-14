import { BrandColors } from './colors';
import { DisasterColors } from './disasterColors';
import { GradientColors } from './gradients';
import { SemanticColors } from './semanticColors';
import { SeverityColors } from './severityColors';

export const DarkThemeColors = {
  // Exact Dark Theme / Neutral Tokens
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
  primary: '#0EA5E9',
  secondary: '#14B8A6',

  // Compatibility tokens for existing components
  text: '#F8FAFC',
  backgroundElement: '#111F30',
  backgroundSelected: '#1C2D42',

  // Embedded Brand Tokens
  brand: BrandColors,

  // Embedded Semantic Tokens
  semantic: SemanticColors,

  // Embedded Disaster Tokens
  disaster: DisasterColors,

  // Embedded Severity Tokens
  severity: SeverityColors,

  // Embedded Gradient Tokens
  gradients: GradientColors,
} as const;

export type DarkTheme = typeof DarkThemeColors;
