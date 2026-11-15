import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '@/components/ui/glass-card';
import { BorderRadius } from '@/constants/theme';
import { BrandColors, DarkThemeColors } from '@/theme';
import { Icon } from './icon';

export interface StickyDashboardHeaderProps {
  scrollY: SharedValue<number>;
  threshold?: number;
  locationName?: string;
  temperature?: number;
  condition?: string;
}

/**
 * StickyDashboardHeader condenses into a slim telemetry bar past the hero scroll threshold.
 * Anchored safely below device status bar with fluid glassmorphism.
 */
export function StickyDashboardHeader({
  scrollY,
  threshold = 110,
  locationName = 'Miami, Florida',
  temperature = 28,
  condition = 'Severe Storm',
}: StickyDashboardHeaderProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [threshold, threshold + 35],
      [0, 1],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [threshold, threshold + 35],
      [-12, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          top: Math.max(insets.top, 12) + 4,
          maxWidth: Math.min(width - 40, 500),
        },
        containerStyle,
      ]}>
      <GlassCard padding={10} borderRadius={BorderRadius.lg} style={styles.card}>
        <View style={styles.leftCol}>
          <Icon name="location-pin" size={15} color={BrandColors.primaryLight} />
          <Text style={styles.locationText} numberOfLines={1}>
            {locationName}
          </Text>
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.conditionText} numberOfLines={1}>
            {condition}
          </Text>
          <View style={styles.tempBadge}>
            <Text style={styles.tempText}>{temperature}°</Text>
          </View>
        </View>
      </GlassCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignSelf: 'center',
    zIndex: 998,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(8, 19, 33, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.28)',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  locationText: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: -0.2,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  conditionText: {
    color: DarkThemeColors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  tempBadge: {
    backgroundColor: 'rgba(14, 165, 233, 0.16)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    borderWidth: 0.8,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  tempText: {
    color: BrandColors.primaryLight,
    fontWeight: '800',
    fontSize: 13,
  },
});
