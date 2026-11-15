export const SeverityColors = {
  level0: '#22C55E',
  normal: '#22C55E',
  level1: '#38BDF8',
  advisory: '#38BDF8',
  level2: '#FACC15',
  watch: '#FACC15',
  level3: '#F97316',
  warning: '#F97316',
  level4: '#DC2626',
  emergency: '#DC2626',
} as const;

export type SeverityColor = keyof typeof SeverityColors;

/**
 * Three-tier severity mapping strictly bound to existing tokens:
 * - Calm / informational -> Blue / Advisory (#38BDF8)
 * - Elevated / caution   -> Amber / Orange / Warning (#F97316)
 * - Critical / emergency -> Red / Emergency (#DC2626)
 */
export type SeverityTier = 'calm' | 'elevated' | 'critical';

export const SeverityTierTokens = {
  calm: {
    text: SeverityColors.advisory,
    border: 'rgba(56, 189, 248, 0.32)',
    background: 'rgba(14, 165, 233, 0.14)',
    accent: '#0EA5E9',
    subtext: '#7DD3FC',
  },
  elevated: {
    text: SeverityColors.warning,
    border: 'rgba(249, 115, 22, 0.35)',
    background: 'rgba(249, 115, 22, 0.14)',
    accent: '#F97316',
    subtext: '#FDBA74',
  },
  critical: {
    text: SeverityColors.emergency,
    border: 'rgba(220, 38, 38, 0.38)',
    background: 'rgba(220, 38, 38, 0.16)',
    accent: '#DC2626',
    subtext: '#FCA5A5',
  },
} as const;

