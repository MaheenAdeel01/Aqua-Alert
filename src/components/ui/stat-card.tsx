import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { Icon, IconName } from '@/components/dashboard/icon';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { GlassCard } from '@/components/ui/glass-card';
import { DarkThemeColors, SeverityTier, SeverityTierTokens } from '@/theme';

export interface StatCardProps {
  icon: IconName;
  label: string;
  value: string | number;
  caption: string;
  severity: SeverityTier;
  progress?: number; // 0 to 100
  style?: StyleProp<ViewStyle>;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Standardized StatCard component for Rain Probability and Flood Risk telemetry.
 * Strictly single-glance and fixed-height (zero expand/collapse).
 * Pixel-identical structure across instances.
 */
export function StatCard({
  icon,
  label,
  value,
  caption,
  severity,
  progress = 0,
  style,
}: StatCardProps) {
  const { width } = useWindowDimensions();
  const tokens = SeverityTierTokens[severity];

  const metrics = useMemo(() => {
    return {
      padding: clamp(14, width * 0.038, 18),
      valSize: clamp(23, width * 0.065, 28),
      labelSize: clamp(11, width * 0.03, 12.5),
      captionSize: clamp(10.5, width * 0.027, 12),
      iconSize: clamp(15, width * 0.038, 17),
      trackHeight: clamp(6, width * 0.016, 7.5),
    };
  }, [width]);

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <GlassCard
      severity={severity}
      padding={metrics.padding}
      style={[styles.card, style]}>
      {/* 1. Header: Icon + Label */}
      <View style={styles.header}>
        <Icon name={icon} size={metrics.iconSize} color={tokens.text} />
        <Text
          style={[styles.label, { fontSize: metrics.labelSize }]}
          numberOfLines={1}>
          {label}
        </Text>
      </View>

      {/* 2. Primary Telemetry Reading */}
      {typeof value === 'number' || (typeof value === 'string' && /^\d+%$/.test(value)) ? (
        <AnimatedNumber
          value={typeof value === 'number' ? value : parseInt(value, 10)}
          suffix={typeof value === 'string' && value.endsWith('%') ? '%' : ''}
          style={[
            styles.value,
            {
              fontSize: metrics.valSize,
              color: severity === 'calm' ? DarkThemeColors.textPrimary : tokens.text,
            },
          ]}
        />
      ) : (
        <Text
          style={[
            styles.value,
            {
              fontSize: metrics.valSize,
              color: severity === 'calm' ? DarkThemeColors.textPrimary : tokens.text,
            },
          ]}
          numberOfLines={1}>
          {value}
        </Text>
      )}

      {/* 3. Fluid Progress Track */}
      <View
        style={[
          styles.progressTrack,
          {
            height: metrics.trackHeight,
            borderRadius: metrics.trackHeight / 2,
            borderColor: tokens.border,
          },
        ]}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${clampedProgress}%`,
              backgroundColor: tokens.accent,
              borderRadius: metrics.trackHeight / 2,
            },
          ]}>
          <View
            style={[
              styles.glowCap,
              { backgroundColor: tokens.subtext },
            ]}
          />
        </View>
      </View>

      {/* 4. Caption / Contextual Subtext */}
      <Text
        style={[
          styles.caption,
          {
            fontSize: metrics.captionSize,
            color: severity === 'calm' ? DarkThemeColors.textMuted : tokens.subtext,
          },
        ]}
        numberOfLines={1}>
        {caption}
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'space-between',
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: DarkThemeColors.textSecondary,
    fontWeight: '600',
    flexShrink: 1,
  },
  value: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  progressTrack: {
    width: '100%',
    backgroundColor: 'rgba(8, 20, 36, 0.95)',
    borderWidth: 0.8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    position: 'relative',
  },
  glowCap: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  caption: {
    fontWeight: '500',
  },
});
