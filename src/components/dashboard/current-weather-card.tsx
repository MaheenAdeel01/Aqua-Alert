import React, { useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { BorderRadius, Spacing } from '@/constants/theme';
import { BrandColors, DarkThemeColors } from '@/theme';
import { Icon } from './icon';

interface CurrentWeatherCardProps {
  temperature?: number;
  condition?: string;
  feelsLike?: number;
  high?: number;
  low?: number;
  windSpeed?: string;
  humidity?: string;
  pressure?: string;
  updatedAgo?: string;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Current conditions hero telemetry card.
 * Wrapped in <GlassCard> with "Updated Xm ago" caption token and unified outlined icons.
 */
export function CurrentWeatherCard({
  temperature = 28,
  condition = 'Severe Tropical Storm',
  feelsLike = 32,
  high = 30,
  low = 24,
  windSpeed = '48 km/h',
  humidity = '92%',
  pressure = '992 hPa',
  updatedAgo = '4m ago',
}: CurrentWeatherCardProps) {
  const { width } = useWindowDimensions();

  const metrics = useMemo(() => {
    return {
      padding: clamp(Spacing.three, width * 0.045, Spacing.four),
      tempSize: clamp(48, width * 0.13, 62),
      conditionSize: clamp(15, width * 0.04, 18),
      detailSize: clamp(12, width * 0.031, 13),
      badgeIconSize: clamp(24, width * 0.065, 30),
      badgeSize: clamp(44, width * 0.115, 52),
    };
  }, [width]);

  return (
    <GlassCard padding={metrics.padding} style={styles.card}>
      {/* Header: Condition headline + vector storm icon badge */}
      <View style={styles.headerRow}>
        <View style={styles.headerTextGroup}>
          <Text
            style={[
              styles.conditionText,
              {
                fontSize: metrics.conditionSize,
                lineHeight: metrics.conditionSize * 1.25,
              },
            ]}
            numberOfLines={1}>
            {condition}
          </Text>
          <View style={styles.subtextRow}>
            <Text style={styles.subtext}>Active coastal storm advisory</Text>
            <Text style={styles.bulletSeparator}>·</Text>
            <Text style={styles.updatedCaption}>Updated {updatedAgo}</Text>
          </View>
        </View>

        <View
          style={[
            styles.iconBadge,
            {
              width: metrics.badgeSize,
              height: metrics.badgeSize,
              borderRadius: BorderRadius.md,
            },
          ]}>
          <Icon
            name="cloud-lightning"
            size={metrics.badgeIconSize}
            color={BrandColors.primaryLight}
          />
        </View>
      </View>

      {/* Main Reading: Large Temperature readout + Secondary Details */}
      <View style={styles.tempRow}>
        <Text
          style={[
            styles.tempValue,
            {
              fontSize: metrics.tempSize,
              lineHeight: metrics.tempSize * 1.05,
            },
          ]}>
          {temperature}°
        </Text>

        <View style={styles.tempMetaGroup}>
          <View style={styles.metaLine}>
            <Icon name="thermometer" size={14} color={DarkThemeColors.textSecondary} />
            <Text style={[styles.metaText, { fontSize: metrics.detailSize }]}>
              Feels like <Text style={styles.metaValueHighlight}>{feelsLike}°</Text>
            </Text>
          </View>

          <View style={styles.metaLine}>
            <Text style={[styles.rangeText, { fontSize: metrics.detailSize }]}>
              H: {high}° · L: {low}°
            </Text>
          </View>
        </View>
      </View>

      {/* Footer telemetry bar: Wind, Humidity & Pressure */}
      <View style={styles.telemetryBar}>
        <View style={styles.telemetryItem}>
          <Text style={styles.telemetryLabel}>WIND</Text>
          <Text style={styles.telemetryValue}>{windSpeed}</Text>
        </View>

        <View style={styles.telemetryDivider} />

        <View style={styles.telemetryItem}>
          <Text style={styles.telemetryLabel}>HUMIDITY</Text>
          <Text style={styles.telemetryValue}>{humidity}</Text>
        </View>

        <View style={styles.telemetryDivider} />

        <View style={styles.telemetryItem}>
          <Text style={styles.telemetryLabel}>PRESSURE</Text>
          <Text style={styles.telemetryValueCyan}>{pressure}</Text>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextGroup: {
    flex: 1,
    paddingRight: 10,
    gap: 3,
  },
  conditionText: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },
  subtext: {
    color: DarkThemeColors.textMuted,
    fontSize: 12,
    fontWeight: '400',
  },
  bulletSeparator: {
    color: DarkThemeColors.textDisabled,
    fontSize: 12,
  },
  updatedCaption: {
    color: DarkThemeColors.textSecondary,
    fontSize: 11.5,
    fontWeight: '500',
  },
  iconBadge: {
    backgroundColor: 'rgba(14, 165, 233, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.32)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 2,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  tempValue: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '800',
    letterSpacing: -2,
  },
  tempMetaGroup: {
    alignItems: 'flex-end',
    gap: 5,
    paddingBottom: 4,
  },
  metaLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: DarkThemeColors.textSecondary,
    fontWeight: '500',
  },
  metaValueHighlight: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
  },
  rangeText: {
    color: DarkThemeColors.textMuted,
    fontWeight: '500',
  },
  telemetryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(56, 189, 248, 0.12)',
  },
  telemetryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  telemetryLabel: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  telemetryValue: {
    color: DarkThemeColors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  telemetryValueCyan: {
    color: BrandColors.primaryLight,
    fontSize: 13,
    fontWeight: '600',
  },
  telemetryDivider: {
    width: 1,
    height: 22,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
});
