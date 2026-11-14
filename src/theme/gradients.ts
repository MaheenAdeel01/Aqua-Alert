export const GradientColors = {
  primaryGradient: ['#0EA5E9', '#14B8A6'] as const,
  deepOceanGradient: ['#0369A1', '#0F766E'] as const,
  dashboardGradient: ['#111F30', '#1E3A5F'] as const,
  css: {
    primaryGradient: 'linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)',
    deepOceanGradient: 'linear-gradient(135deg, #0369A1 0%, #0F766E 100%)',
    dashboardGradient: 'linear-gradient(135deg, #111F30 0%, #1E3A5F 100%)',
  },
} as const;

export type GradientColor = keyof typeof GradientColors;
