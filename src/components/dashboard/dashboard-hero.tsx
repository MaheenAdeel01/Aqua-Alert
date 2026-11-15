import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { BrandColors, DarkThemeColors } from '@/theme';
import { Icon } from './icon';

interface DashboardHeroProps {
  greeting?: string;
  locationName?: string;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

/**
 * DashboardHero renders upper-left branding, identity-free greeting, and location pin.
 * Preserves the cyclone visibility in the upper-right with deliberate negative space.
 */
export function DashboardHero({
  greeting,
  locationName = 'Miami, Florida',
}: DashboardHeroProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const activeGreeting = greeting ?? getTimeOfDayGreeting();

  const metrics = useMemo(() => {
    return {
      logoSize: clamp(34, width * 0.095, 46),
      brandSize: clamp(18, width * 0.048, 22),
      greetingSize: clamp(20, width * 0.056, 26),
      locationSize: clamp(13, width * 0.034, 15),
      pinSize: clamp(14, width * 0.036, 16),
      paddingTop: Math.max(insets.top, Spacing.three) + Spacing.one,
      gapBetweenBrandAndGreeting: clamp(Spacing.three, height * 0.016, Spacing.four),
      marginBottom: clamp(Spacing.three, height * 0.022, Spacing.four),
    };
  }, [width, height, insets.top]);

  return (
    <View
      style={[
        styles.heroContainer,
        {
          paddingTop: metrics.paddingTop,
          marginBottom: metrics.marginBottom,
        },
      ]}>
      {/* Left Column: Branding, Greeting & Location */}
      <View style={styles.leftColumn}>
        {/* Brand Row: Logo + App Name */}
        <View style={styles.brandRow}>
          <Image
            source={require('@/assets/aqua_alert_logo_transparent_clean.png')}
            style={{ width: metrics.logoSize, height: metrics.logoSize }}
            contentFit="contain"
            transition={0}
            cachePolicy="memory"
          />
          <Text
            style={[
              styles.brandText,
              {
                fontSize: metrics.brandSize,
                lineHeight: metrics.brandSize * 1.2,
              },
            ]}>
            Aqua <Text style={styles.brandTextAccent}>Alert</Text>
          </Text>
        </View>

        {/* Greeting & Location Info (No user name, zero auth/login assumption) */}
        <View style={[styles.greetingBlock, { marginTop: metrics.gapBetweenBrandAndGreeting }]}>
          <Text
            style={[
              styles.greetingText,
              {
                fontSize: metrics.greetingSize,
                lineHeight: metrics.greetingSize * 1.18,
              },
            ]}
            numberOfLines={1}>
            {activeGreeting}
          </Text>

          <View style={styles.locationRow}>
            <Icon
              name="location-pin"
              size={metrics.pinSize}
              color={BrandColors.primaryLight}
              style={styles.locationIcon}
            />
            <Text
              style={[
                styles.locationText,
                {
                  fontSize: metrics.locationSize,
                },
              ]}
              numberOfLines={1}>
              {locationName}
            </Text>
          </View>
        </View>
      </View>

      {/* Right Column: Deliberate negative space preserving cyclone & storm visibility */}
      <View
        style={styles.cycloneBreathingRoom}
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  leftColumn: {
    flex: 1,
    maxWidth: '60%',
    justifyContent: 'flex-start',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandText: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  brandTextAccent: {
    color: BrandColors.primaryLight,
    fontWeight: '800',
  },
  greetingBlock: {
    gap: 4,
  },
  greetingText: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  locationIcon: {
    marginTop: 1,
  },
  locationText: {
    color: DarkThemeColors.textSecondary,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  cycloneBreathingRoom: {
    width: '40%',
    minHeight: 110,
  },
});
