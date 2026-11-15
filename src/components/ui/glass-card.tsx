import React, { useMemo } from 'react';
import {
  Pressable,
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
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: 'button' | 'none';
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Base GlassCard component shared across all screens.
 * Uses exact surface tokens, border tokens, and radius tokens.
 * Features tactile press feedback when onPress is provided.
 */
export function GlassCard({
  children,
  severity,
  style,
  padding,
  borderRadius,
  noBorder = false,
  onPress,
  accessibilityLabel,
  accessibilityRole,
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

  const cardContent = (
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

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed && styles.cardPressed,
        ]}
        accessibilityRole={accessibilityRole ?? 'button'}
        accessibilityLabel={accessibilityLabel}>
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  pressableContainer: {
    width: '100%',
  },
  cardPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  baseCard: {
    backgroundColor: 'rgba(17, 31, 48, 0.82)',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
    position: 'relative',
    width: '100%',
  },
});
