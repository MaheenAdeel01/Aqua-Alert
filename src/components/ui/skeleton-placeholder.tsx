import React, { useEffect } from 'react';
import { DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { BorderRadius } from '@/constants/theme';

export interface SkeletonPlaceholderProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * SkeletonPlaceholder provides a zero-jank shimmer skeleton loader.
 * Uses surface tokens and 60fps Reanimated looping opacity.
 */
export function SkeletonPlaceholder({
  width = '100%',
  height = 20,
  borderRadius = BorderRadius.md,
  style,
}: SkeletonPlaceholderProps) {
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.75, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.35, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

/**
 * Composite Weather Hero Skeleton
 */
export function WeatherHeroSkeleton() {
  return (
    <View style={styles.compositeContainer}>
      <View style={styles.rowBetween}>
        <View style={styles.gapCol}>
          <SkeletonPlaceholder width={180} height={22} />
          <SkeletonPlaceholder width={120} height={14} />
        </View>
        <SkeletonPlaceholder width={48} height={48} borderRadius={14} />
      </View>
      <View style={[styles.rowBetween, { marginTop: 14 }]}>
        <SkeletonPlaceholder width={110} height={56} />
        <View style={styles.gapColEnd}>
          <SkeletonPlaceholder width={90} height={16} />
          <SkeletonPlaceholder width={70} height={14} />
        </View>
      </View>
      <View style={[styles.rowBetween, { marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(56, 189, 248, 0.1)' }]}>
        <SkeletonPlaceholder width="28%" height={26} />
        <SkeletonPlaceholder width="28%" height={26} />
        <SkeletonPlaceholder width="28%" height={26} />
      </View>
    </View>
  );
}

/**
 * Composite Radar Viewport Skeleton
 */
export function RadarSkeleton() {
  return (
    <View style={styles.compositeContainer}>
      <View style={styles.rowBetween}>
        <SkeletonPlaceholder width={150} height={18} />
        <SkeletonPlaceholder width={80} height={18} borderRadius={999} />
      </View>
      <SkeletonPlaceholder width="100%" height={150} borderRadius={16} style={{ marginTop: 12 }} />
      <View style={[styles.rowBetween, { marginTop: 8 }]}>
        <SkeletonPlaceholder width={130} height={12} />
        <SkeletonPlaceholder width={110} height={12} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: 'rgba(28, 45, 66, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.12)',
  },
  compositeContainer: {
    padding: 18,
    borderRadius: BorderRadius.xl,
    backgroundColor: 'rgba(17, 31, 48, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.22)',
    gap: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  gapCol: {
    gap: 6,
  },
  gapColEnd: {
    alignItems: 'flex-end',
    gap: 6,
  },
});
