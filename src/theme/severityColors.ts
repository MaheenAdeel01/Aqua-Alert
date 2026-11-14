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
