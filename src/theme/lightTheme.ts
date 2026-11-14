import { BrandColors } from './colors';
import { DisasterColors } from './disasterColors';
import { GradientColors } from './gradients';
import { SemanticColors } from './semanticColors';
import { SeverityColors } from './severityColors';

export const LightThemeColors = {
  // Exact Light Theme Tokens
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceVariant: '#F1F5F9',
  surfaceElevated: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  textDisabled: '#94A3B8',
  outline: '#CBD5E1',
  outlineSubtle: '#E2E8F0',
  primary: '#0284C7',
  secondary: '#0F766E',

  // Compatibility tokens for existing components
  text: '#0F172A',
  backgroundElement: '#F1F5F9',
  backgroundSelected: '#E2E8F0',

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

export type LightTheme = typeof LightThemeColors;
