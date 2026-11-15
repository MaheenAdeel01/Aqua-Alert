import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { DarkThemeColors } from '@/theme';

interface DashboardBackgroundProps extends ViewProps {
  children?: React.ReactNode;
}

/**
 * DashboardBackground with subtle, GPU-composited ambient storm motion.
 * Slowly animates the cyclone swirl in the upper-right without battery drain or layout shifts.
 * Automatically respects user's system reduced-motion preference.
 */
export function DashboardBackground({ children, style, ...props }: DashboardBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const breathScale = useSharedValue(1);
  const driftRotate = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion) return;

    breathScale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 10000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    driftRotate.value = withRepeat(
      withSequence(
        withTiming(0.35, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-0.35, { duration: 12000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [breathScale, driftRotate, reducedMotion]);

  const animatedStormStyle = useAnimatedStyle(() => {
    if (reducedMotion) {
      return {};
    }
    return {
      transform: [
        { scale: breathScale.value },
        { rotate: `${driftRotate.value}deg` },
      ],
    };
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStormStyle]}>
        <Image
          source={require('@/assets/dashboardbg.png')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition="top"
          transition={0}
          priority="high"
          cachePolicy="memory"
        />
      </Animated.View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkThemeColors.background,
    overflow: 'hidden',
    position: 'relative',
  },
});
