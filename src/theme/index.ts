import { BrandColors, NeutralColors } from './colors';
import { DarkThemeColors } from './darkTheme';
import { DisasterColors } from './disasterColors';
import { GradientColors } from './gradients';
import { LightThemeColors } from './lightTheme';
import { SemanticColors } from './semanticColors';
import { SeverityColors } from './severityColors';

export * from './colors';
export * from './semanticColors';
export * from './disasterColors';
export * from './severityColors';
export * from './gradients';
export * from './lightTheme';
export * from './darkTheme';

export const Theme = {
  light: LightThemeColors,
  dark: DarkThemeColors,
} as const;

export type ColorTheme = typeof Theme.light | typeof Theme.dark;
export type ThemeMode = keyof typeof Theme;

/**
 * Common color string keys present in both light and dark themes
 */
export type ThemeColorKey = {
  [K in keyof typeof Theme.light & keyof typeof Theme.dark]: (typeof Theme.light)[K] extends string
    ? (typeof Theme.dark)[K] extends string
      ? K
      : never
    : never;
}[keyof typeof Theme.light & keyof typeof Theme.dark];
