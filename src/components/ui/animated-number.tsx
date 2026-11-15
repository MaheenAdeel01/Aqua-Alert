import React, { useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

export interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  style?: StyleProp<TextStyle>;
  triggerKey?: string | number; // Pass to trigger re-count on refresh
}

/**
 * AnimatedNumber provides a smooth 60fps numeric count-up animation on first load and refresh.
 * Uses cubic-out easing for natural decelerating momentum.
 */
export function AnimatedNumber({
  value,
  duration = 800,
  prefix = '',
  suffix = '',
  style,
  triggerKey,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const startVal = 0;
    const targetVal = value;

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const current = Math.round(startVal + (targetVal - startVal) * easedProgress);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, triggerKey]);

  return (
    <Text style={style}>
      {prefix}
      {displayValue}
      {suffix}
    </Text>
  );
}
