import React, { useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { BrandColors, DarkThemeColors, SeverityColors } from '@/theme';
import { Icon } from './icon';

interface RiskMetricsRowProps {
  rainProbability?: number; // e.g. 92
  floodRiskLevel?: string; // e.g. 'High Risk'
  floodRiskPercent?: number; // e.g. 78
  surgeHeight?: string; // e.g. '1.8m surge'
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function RiskMetricsRow({
  rainProbability = 92,
  floodRiskLevel = 'High Risk',
  floodRiskPercent = 82,
  surgeHeight = '1.8m surge',
}: RiskMetricsRowProps) {
  const { width } = useWindowDimensions();

  const metrics = useMemo(() => {
    return {
      padding: clamp(14, width * 0.038, 18),
      radius: clamp(16, width * 0.045, 18),
      valSize: clamp(24, width * 0.068, 30),
      labelSize: clamp(11, width * 0.03, 12.5),
      subtextSize: clamp(10.5, width * 0.027, 12),
      iconSize: clamp(15, width * 0.038, 17),
      trackHeight: clamp(6, width * 0.016, 7.5),
    };
  }, [width]);

  const clampedRain = Math.min(Math.max(rainProbability, 0), 100);
  const clampedFlood = Math.min(Math.max(floodRiskPercent, 0), 100);

  return (
    <View style={styles.container}>
      {/* Card 1: Rain Probability Card */}
      <View
        style={[
          styles.metricCard,
          styles.rainCard,
          {
            padding: metrics.padding,
            borderRadius: metrics.radius,
          },
        ]}>
        {/* Header: Droplets Icon + Card Label */}
        <View style={styles.cardHeader}>
          <Icon name="droplets" size={metrics.iconSize} color={BrandColors.primaryLight} />
          <Text style={[styles.cardLabel, { fontSize: metrics.labelSize }]} numberOfLines={1}>
            Rain Probability
          </Text>
        </View>

        {/* Primary Reading */}
        <Text style={[styles.readingValue, { fontSize: metrics.valSize }]}>
          {clampedRain}%
        </Text>

        {/* Cyan Liquid Progress Indicator */}
        <View
          style={[
            styles.progressTrack,
            styles.rainTrack,
            { height: metrics.trackHeight, borderRadius: metrics.trackHeight / 2 },
          ]}>
          <View
            style={[
              styles.progressBar,
              styles.rainBar,
              {
                width: `${clampedRain}%`,
                borderRadius: metrics.trackHeight / 2,
              },
            ]}>
            {/* Glowing leading wave cap */}
            <View style={styles.rainGlowCap} />
          </View>
        </View>

        {/* Status Annotation */}
        <Text
          style={[styles.statusSubtext, { fontSize: metrics.subtextSize }]}
          numberOfLines={1}>
          Heavy precipitation
        </Text>
      </View>

      {/* Card 2: Flood Risk Card */}
      <View
        style={[
          styles.metricCard,
          styles.floodCard,
          {
            padding: metrics.padding,
            borderRadius: metrics.radius,
          },
        ]}>
        {/* Header: Alert Triangle Icon + Card Label */}
        <View style={styles.cardHeader}>
          <Icon name="alert-triangle" size={metrics.iconSize} color={SeverityColors.warning} />
          <Text style={[styles.cardLabel, { fontSize: metrics.labelSize }]} numberOfLines={1}>
            Flood Risk
          </Text>
        </View>

        {/* Primary Reading */}
        <Text
          style={[
            styles.readingValue,
            styles.floodValue,
            { fontSize: metrics.valSize },
          ]}
          numberOfLines={1}>
          {floodRiskLevel}
        </Text>

        {/* Orange Severity Progress Indicator */}
        <View
          style={[
            styles.progressTrack,
            styles.floodTrack,
            { height: metrics.trackHeight, borderRadius: metrics.trackHeight / 2 },
          ]}>
          <View
            style={[
              styles.progressBar,
              styles.floodBar,
              {
                width: `${clampedFlood}%`,
                borderRadius: metrics.trackHeight / 2,
              },
            ]}>
            {/* Glowing leading cap */}
            <View style={styles.floodGlowCap} />
          </View>
        </View>

        {/* Status Annotation */}
        <Text
          style={[
            styles.statusSubtext,
            styles.floodSubtext,
            { fontSize: metrics.subtextSize },
          ]}
          numberOfLines={1}>
          {surgeHeight}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: 'rgba(17, 31, 48, 0.82)',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'space-between',
    gap: 10,
  },
  rainCard: {
    borderColor: 'rgba(56, 189, 248, 0.22)',
    shadowColor: '#0EA5E9',
  },
  floodCard: {
    borderColor: 'rgba(249, 115, 22, 0.28)',
    shadowColor: '#F97316',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardLabel: {
    color: DarkThemeColors.textSecondary,
    fontWeight: '600',
    flexShrink: 1,
  },
  readingValue: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  floodValue: {
    color: SeverityColors.warning,
  },
  progressTrack: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 36, 0.95)',
    borderWidth: 0.8,
    overflow: 'hidden',
    position: 'relative',
  },
  rainTrack: {
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  floodTrack: {
    borderColor: 'rgba(249, 115, 22, 0.3)',
  },
  progressBar: {
    height: '100%',
    position: 'relative',
  },
  rainBar: {
    backgroundColor: '#0EA5E9',
  },
  floodBar: {
    backgroundColor: '#F97316',
  },
  rainGlowCap: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#BAE6FD',
  },
  floodGlowCap: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FED7AA',
  },
  statusSubtext: {
    color: DarkThemeColors.textMuted,
    fontWeight: '500',
  },
  floodSubtext: {
    color: '#FDBA74',
  },
});
