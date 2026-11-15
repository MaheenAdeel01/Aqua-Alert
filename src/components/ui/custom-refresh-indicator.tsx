import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Icon } from '@/components/dashboard/icon';
import { BrandColors, DarkThemeColors } from '@/theme';

export interface CustomRefreshIndicatorProps {
  refreshing: boolean;
  label?: string;
}

/**
 * On-brand Doppler radar sweep / droplet refresh indicator.
 * Built strictly with existing theme tokens.
 */
export function CustomRefreshIndicator({
  refreshing,
  label = 'SYNCING SATELLITE TELEMETRY...',
}: CustomRefreshIndicatorProps) {
  const rotation = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (refreshing) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
      pulse.value = withRepeat(
        withTiming(1.15, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      rotation.value = 0;
      pulse.value = 1;
    }
  }, [pulse, refreshing, rotation]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  if (!refreshing) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinnerRing, spinStyle]}>
        <View style={styles.radarNeedle} />
      </Animated.View>

      <Animated.View style={[styles.centerDroplet, pulseStyle]}>
        <Icon name="droplets" size={14} color={BrandColors.primaryLight} />
      </Animated.View>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  spinnerRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    borderTopColor: BrandColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radarNeedle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#38BDF8',
    marginTop: -2,
    shadowColor: '#38BDF8',
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  centerDroplet: {
    position: 'absolute',
    top: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
