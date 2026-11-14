export const SemanticColors = {
  success: '#22C55E',
  successSoft: '#DCFCE7',
  warning: '#F59E0B',
  warningSoft: '#FEF3C7',
  error: '#EF4444',
  critical: '#EF4444',
  errorSoft: '#FEE2E2',
  information: '#3B82F6',
  informationSoft: '#DBEAFE',
  emergencyPurple: '#A855F7',
  emergencyPurpleSoft: '#F3E8FF',
} as const;

export type SemanticColor = keyof typeof SemanticColors;
