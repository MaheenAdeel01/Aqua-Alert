import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

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

/**
 * SeverityBadge renders a precision status pill mapped to the 3-tier severity tokens.
 * Used for "LIVE STREAM", "HIGH RISK", "EMERGENCY PROTOCOL ACTIVE".
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
      {showPulseDot && (
        <View
          style={[
            styles.pulseDot,
            {
              backgroundColor: tokens.text,
              shadowColor: tokens.text,
            },
          ]}
        />
      )}
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
    gap: 5,
    borderWidth: 1,
    borderRadius: BorderRadius.pill,
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
