import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { BorderRadius, Spacing } from '@/constants/theme';
import { SeverityTier, SeverityTierTokens } from '@/theme';

export interface GlassCardProps {
  children?: React.ReactNode;
  severity?: SeverityTier;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  borderRadius?: number;
  noBorder?: boolean;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Base GlassCard component shared across all screens.
 * Uses exact surface tokens, border tokens, and radius tokens.
 */
export function GlassCard({
  children,
  severity,
  style,
  padding,
  borderRadius,
  noBorder = false,
}: GlassCardProps) {
  const { width } = useWindowDimensions();

  const dynamicMetrics = useMemo(() => {
    return {
      padding: clamp(Spacing.three, width * 0.045, Spacing.four),
      radius: clamp(BorderRadius.lg, width * 0.045, BorderRadius.xl),
    };
  }, [width]);

  const activeRadius = borderRadius ?? dynamicMetrics.radius;
  const activePadding = padding ?? dynamicMetrics.padding;

  const borderColor = severity
    ? SeverityTierTokens[severity].border
    : 'rgba(56, 189, 248, 0.22)';

  const shadowColor = severity === 'critical'
    ? '#DC2626'
    : severity === 'elevated'
    ? '#F97316'
    : '#0EA5E9';

  return (
    <View
      style={[
        styles.baseCard,
        {
          borderRadius: activeRadius,
          padding: activePadding,
          borderColor: noBorder ? 'transparent' : borderColor,
          shadowColor,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  baseCard: {
    backgroundColor: 'rgba(17, 31, 48, 0.82)',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
    position: 'relative',
  },
});
