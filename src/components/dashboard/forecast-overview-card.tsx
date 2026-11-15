import React, { useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { BrandColors, DarkThemeColors } from '@/theme';
import { Icon, IconName } from './icon';

interface ForecastDay {
  day: string;
  date: string;
  icon: IconName;
  condition: string;
  high: number;
  low: number;
  rainChance: number;
}

const DEFAULT_FORECAST: ForecastDay[] = [
  {
    day: 'Today',
    date: 'Nov 15',
    icon: 'cloud-lightning',
    condition: 'Thunderstorm & Surge',
    high: 30,
    low: 24,
    rainChance: 95,
  },
  {
    day: 'Mon',
    date: 'Nov 16',
    icon: 'cloud-rain',
    condition: 'Heavy Precipitation',
    high: 29,
    low: 23,
    rainChance: 85,
  },
  {
    day: 'Tue',
    date: 'Nov 17',
    icon: 'droplets',
    condition: 'Coastal Showers',
    high: 27,
    low: 22,
    rainChance: 60,
  },
  {
    day: 'Wed',
    date: 'Nov 18',
    icon: 'cloud-rain',
    condition: 'Moderate Rain',
    high: 28,
    low: 21,
    rainChance: 45,
  },
];

interface ForecastOverviewCardProps {
  days?: ForecastDay[];
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ForecastOverviewCard({ days = DEFAULT_FORECAST }: ForecastOverviewCardProps) {
  const { width } = useWindowDimensions();

  const metrics = useMemo(() => {
    return {
      padding: clamp(16, width * 0.045, 20),
      radius: clamp(16, width * 0.045, 20),
      titleSize: clamp(14, width * 0.038, 16.5),
      daySize: clamp(13, width * 0.035, 14.5),
      conditionSize: clamp(11.5, width * 0.03, 13),
      tempSize: clamp(13, width * 0.035, 14.5),
      iconSize: clamp(18, width * 0.05, 22),
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Icon name="calendar" size={18} color={BrandColors.primaryLight} />
          <Text style={[styles.title, { fontSize: metrics.titleSize }]}>
            4-Day Forecast Overview
          </Text>
        </View>
        <Text style={styles.badgeText}>72-HR OUTLOOK</Text>
      </View>

      {/* Days List */}
      <View style={styles.daysList}>
        {days.map((item, index) => {
          const isLast = index === days.length - 1;
          return (
            <View
              key={item.day}
              style={[
                styles.dayRow,
                !isLast && styles.dayRowDivider,
              ]}>
              {/* Day & Date Column */}
              <View style={styles.dayCol}>
                <Text style={[styles.dayName, { fontSize: metrics.daySize }]}>
                  {item.day}
                </Text>
                <Text style={styles.dayDate}>{item.date}</Text>
              </View>

              {/* Icon & Condition Column */}
              <View style={styles.conditionCol}>
                <View style={styles.iconCircle}>
                  <Icon
                    name={item.icon}
                    size={metrics.iconSize}
                    color={index === 0 ? BrandColors.primaryLight : '#94A3B8'}
                  />
                </View>
                <View style={styles.conditionTextGroup}>
                  <Text
                    style={[styles.conditionText, { fontSize: metrics.conditionSize }]}
                    numberOfLines={1}>
                    {item.condition}
                  </Text>
                  <Text style={styles.rainChanceText}>
                    {item.rainChance}% rain probability
                  </Text>
                </View>
              </View>

              {/* Temperature Spread Column */}
              <View style={styles.tempCol}>
                <Text style={[styles.highTemp, { fontSize: metrics.tempSize }]}>
                  {item.high}°
                </Text>
                <Text style={[styles.lowTemp, { fontSize: metrics.tempSize }]}>
                  {item.low}°
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(17, 31, 48, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.22)',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  badgeText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  daysList: {
    gap: 2,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dayRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(56, 189, 248, 0.1)',
  },
  dayCol: {
    width: 62,
    gap: 2,
  },
  dayName: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
  },
  dayDate: {
    color: DarkThemeColors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  conditionCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 8,
    minWidth: 0,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(8, 20, 36, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionTextGroup: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  conditionText: {
    color: DarkThemeColors.textSecondary,
    fontWeight: '600',
  },
  rainChanceText: {
    color: BrandColors.primaryLight,
    fontSize: 10.5,
    fontWeight: '500',
  },
  tempCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'flex-end',
    width: 58,
  },
  highTemp: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
  },
  lowTemp: {
    color: DarkThemeColors.textMuted,
    fontWeight: '500',
  },
});
