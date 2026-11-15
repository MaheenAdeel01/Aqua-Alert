import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StatCard } from '@/components/ui/stat-card';

interface RiskMetricsRowProps {
  rainProbability?: number; // e.g. 92
  floodRiskLevel?: string; // e.g. 'High Risk'
  floodRiskPercent?: number; // e.g. 82
  surgeHeight?: string; // e.g. '1.8m surge'
}

/**
 * Rebuilds Rain Probability and Flood Risk as two identical instances of <StatCard>.
 * Pixel-identical layout differing only in content, progress, and mapped severity tier.
 */
export function RiskMetricsRow({
  rainProbability = 92,
  floodRiskLevel = 'High Risk',
  floodRiskPercent = 82,
  surgeHeight = '1.8m surge',
}: RiskMetricsRowProps) {
  const clampedRain = Math.min(Math.max(rainProbability, 0), 100);
  const clampedFlood = Math.min(Math.max(floodRiskPercent, 0), 100);

  return (
    <View style={styles.container}>
      {/* Instance 1: Rain Probability (Calm / Informational Tier) */}
      <StatCard
        icon="droplets"
        label="Rain Probability"
        value={`${clampedRain}%`}
        caption="Heavy precipitation"
        severity="calm"
        progress={clampedRain}
      />

      {/* Instance 2: Flood Risk (Elevated / Caution Tier) */}
      <StatCard
        icon="alert-triangle"
        label="Flood Risk"
        value={floodRiskLevel}
        caption={surgeHeight}
        severity="elevated"
        progress={clampedFlood}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
});
