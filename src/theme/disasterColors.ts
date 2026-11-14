export const DisasterColors = {
  flood: '#0284C7',
  flashFlood: '#06B6D4',
  earthquake: '#F97316',
  heatwave: '#F59E0B',
  landslide: '#A16207',
  cyclone: '#8B5CF6',
  wildfire: '#DC2626',
  drought: '#84934A',
} as const;

export type DisasterColor = keyof typeof DisasterColors;
