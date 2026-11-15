import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export interface AnimatedEntranceProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  offsetY?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * AnimatedEntrance provides a staggered fade-in and slide-up entrance animation.
 * Enforces smooth 60fps GPU-accelerated compositing via react-native-reanimated.
 */
export function AnimatedEntrance({
  children,
  delay = 0,
  duration = 420,
  offsetY = 18,
  style,
}: AnimatedEntranceProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(offsetY);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [delay, duration, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
