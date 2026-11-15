import React, { useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { BrandColors, DarkThemeColors } from '@/theme';
import { Icon } from './icon';

interface SafetyTipsCardProps {
  title?: string;
  message?: string;
  actionText?: string;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function SafetyTipsCard({
  title = 'Storm Surge Safety Advisory',
  message = 'Seek higher ground immediately if located in low-lying coastal zones. Avoid driving through flooded roadways and ensure emergency power packs are charged.',
  actionText = 'Emergency Protocol Active',
}: SafetyTipsCardProps) {
  const { width } = useWindowDimensions();

  const metrics = useMemo(() => {
    return {
      padding: clamp(14, width * 0.04, 18),
      radius: clamp(16, width * 0.045, 18),
      titleSize: clamp(13, width * 0.035, 15),
      bodySize: clamp(12, width * 0.031, 13.5),
      shieldSize: clamp(20, width * 0.055, 24),
      shieldBadge: clamp(36, width * 0.095, 42),
    };
  }, [width]);

  return (
    <View
      style={[
        styles.card,
        {
          padding: metrics.padding,
          borderRadius: metrics.radius,
        },
      ]}>
      {/* Icon Badge + Content */}
      <View style={styles.contentRow}>
        <View
          style={[
            styles.shieldContainer,
            {
              width: metrics.shieldBadge,
              height: metrics.shieldBadge,
              borderRadius: metrics.shieldBadge * 0.3,
            },
          ]}>
          <Icon name="shield" size={metrics.shieldSize} color={BrandColors.primaryLight} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { fontSize: metrics.titleSize }]}>
              {title}
            </Text>
            <View style={styles.statusDot} />
          </View>

          <Text
            style={[
              styles.message,
              {
                fontSize: metrics.bodySize,
                lineHeight: metrics.bodySize * 1.45,
              },
            ]}>
            {message}
          </Text>

          <View style={styles.actionRow}>
            <Text style={styles.actionText}>{actionText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(17, 31, 48, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.28)',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  shieldContainer: {
    backgroundColor: 'rgba(14, 165, 233, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  textContainer: {
    flex: 1,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BrandColors.primaryLight,
  },
  message: {
    color: DarkThemeColors.textSecondary,
    fontWeight: '400',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  actionText: {
    color: BrandColors.primaryLight,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});
