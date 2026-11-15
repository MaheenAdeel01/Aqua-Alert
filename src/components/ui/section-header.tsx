import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { Icon, IconName } from '@/components/dashboard/icon';
import { BrandColors, DarkThemeColors } from '@/theme';

export interface SectionHeaderProps {
  icon: IconName;
  title: string;
  trailing?: React.ReactNode | string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Standardized SectionHeader component for consistent title and trailing metadata.
 * Used across Live Weather Radar, 4-Day Forecast Overview, and other dashboard sections.
 */
export function SectionHeader({
  icon,
  title,
  trailing,
  iconColor = BrandColors.primaryLight,
  style,
}: SectionHeaderProps) {
  const { width } = useWindowDimensions();
  const titleSize = clamp(14, width * 0.038, 16.5);
  const iconSize = clamp(17, width * 0.045, 19);

  return (
    <View style={[styles.header, style]}>
      <View style={styles.titleGroup}>
        <Icon name={icon} size={iconSize} color={iconColor} />
        <Text style={[styles.title, { fontSize: titleSize }]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {trailing && (
        <View style={styles.trailingContainer}>
          {typeof trailing === 'string' ? (
            <Text style={styles.trailingText}>{trailing}</Text>
          ) : (
            trailing
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  title: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  trailingContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  trailingText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
