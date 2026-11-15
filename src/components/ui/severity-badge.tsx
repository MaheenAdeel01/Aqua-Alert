import React, { useEffect } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { BorderRadius } from '@/constants/theme';
import { SeverityTier, SeverityTierTokens } from '@/theme';

export interface SeverityBadgeProps {
  level: SeverityTier;
  label: string;
  showPulseDot?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: 'sm' | 'md';
}

function AnimatedPulseDot({ color }: { color: string }) {
  const scale = useSharedValue(1);
  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0.7);

  useEffect(() => {
    // Pulse core breathing
    scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 900, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Expanding beacon ripple
    ringScale.value = withRepeat(
      withTiming(2.4, { duration: 1800, easing: Easing.out(Easing.quad) }),
      -1,
      false
    );
    ringOpacity.value = withRepeat(
      withTiming(0, { duration: 1800, easing: Easing.out(Easing.quad) }),
      -1,
      false
    );
  }, [ringOpacity, ringScale, scale]);

  const coreAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const ringAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  return (
    <View style={styles.pulseContainer}>
      <Animated.View
        style={[
          styles.pulseRing,
          { borderColor: color },
          ringAnimStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.pulseDot,
          { backgroundColor: color, shadowColor: color },
          coreAnimStyle,
        ]}
      />
    </View>
  );
}

/**
 * SeverityBadge renders a precision status pill mapped to the 3-tier severity tokens.
 * Features an active live pulse wave for live indicators.
 */
export function SeverityBadge({
  level,
  label,
  showPulseDot = false,
  style,
  textStyle,
  size = 'sm',
}: SeverityBadgeProps) {
  const tokens = SeverityTierTokens[level];
  const isMd = size === 'md';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: tokens.background,
          borderColor: tokens.border,
          paddingHorizontal: isMd ? 10 : 8,
          paddingVertical: isMd ? 4 : 2.5,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Severity ${level}: ${label}`}>
      {showPulseDot && <AnimatedPulseDot color={tokens.text} />}
      <Text
        style={[
          styles.label,
          {
            color: tokens.text,
            fontSize: isMd ? 11 : 9.5,
          },
          textStyle,
        ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderRadius: BorderRadius.pill,
  },
  pulseContainer: {
    width: 8,
    height: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 4,
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
