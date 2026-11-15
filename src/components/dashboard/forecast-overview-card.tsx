import React, { useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { SectionHeader } from '@/components/ui/section-header';
import { BorderRadius, Spacing } from '@/constants/theme';
import { BrandColors, DarkThemeColors } from '@/theme';
import { Icon, IconName } from './icon';

export interface HourlyForecast {
  time: string;
  temp: number;
  rainChance: number;
  condition: string;
}

export interface ForecastDay {
  day: string;
  date: string;
  icon: IconName;
  condition: string;
  high: number;
  low: number;
  rainChance: number;
  hourly?: HourlyForecast[];
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
    hourly: [
      { time: '12:00', temp: 28, rainChance: 95, condition: 'Severe' },
      { time: '15:00', temp: 30, rainChance: 90, condition: 'Storm' },
      { time: '18:00', temp: 27, rainChance: 80, condition: 'Heavy' },
      { time: '21:00', temp: 25, rainChance: 65, condition: 'Rain' },
    ],
  },
  {
    day: 'Mon',
    date: 'Nov 16',
    icon: 'cloud-rain',
    condition: 'Heavy Precipitation',
    high: 29,
    low: 23,
    rainChance: 85,
    hourly: [
      { time: '09:00', temp: 25, rainChance: 85, condition: 'Rain' },
      { time: '12:00', temp: 28, rainChance: 80, condition: 'Rain' },
      { time: '15:00', temp: 29, rainChance: 75, condition: 'Showers' },
      { time: '18:00', temp: 26, rainChance: 60, condition: 'Light' },
    ],
  },
  {
    day: 'Tue',
    date: 'Nov 17',
    icon: 'droplets',
    condition: 'Coastal Showers',
    high: 27,
    low: 22,
    rainChance: 60,
    hourly: [
      { time: '09:00', temp: 23, rainChance: 60, condition: 'Showers' },
      { time: '12:00', temp: 26, rainChance: 55, condition: 'Passing' },
      { time: '15:00', temp: 27, rainChance: 45, condition: 'Breezy' },
      { time: '18:00', temp: 24, rainChance: 30, condition: 'Clearing' },
    ],
  },
  {
    day: 'Wed',
    date: 'Nov 18',
    icon: 'cloud-rain',
    condition: 'Moderate Rain',
    high: 28,
    low: 21,
    rainChance: 45,
    hourly: [
      { time: '09:00', temp: 22, rainChance: 40, condition: 'Drizzle' },
      { time: '12:00', temp: 27, rainChance: 45, condition: 'Rain' },
      { time: '15:00', temp: 28, rainChance: 35, condition: 'Cloudy' },
      { time: '18:00', temp: 25, rainChance: 25, condition: 'Clear' },
    ],
  },
];

interface ForecastOverviewCardProps {
  days?: ForecastDay[];
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * 4-Day Forecast Overview with Targeted Inline Expand/Collapse.
 * Tap any day to expand inline hourly breakdown without navigating away.
 */
export function ForecastOverviewCard({ days = DEFAULT_FORECAST }: ForecastOverviewCardProps) {
  const { width } = useWindowDimensions();
  const [expandedDay, setExpandedDay] = useState<string | null>('Today');

  const toggleDay = (day: string) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  };

  const metrics = useMemo(() => {
    return {
      padding: clamp(Spacing.three, width * 0.045, Spacing.four),
      daySize: clamp(13, width * 0.035, 14.5),
      conditionSize: clamp(11.5, width * 0.03, 13),
      tempSize: clamp(13, width * 0.035, 14.5),
      iconSize: clamp(18, width * 0.05, 22),
    };
  }, [width]);

  return (
    <GlassCard padding={metrics.padding} style={styles.card}>
      {/* Standardized Section Header */}
      <SectionHeader
        icon="calendar"
        title="4-Day Forecast Overview"
        trailing="TAP FOR HOURLY"
      />

      {/* Days List */}
      <View style={styles.daysList}>
        {days.map((item, index) => {
          const isLast = index === days.length - 1;
          const isToday = index === 0;
          const isExpanded = expandedDay === item.day;

          return (
            <View key={item.day} style={!isLast && styles.dayRowDivider}>
              <Pressable
                onPress={() => toggleDay(item.day)}
                style={({ pressed }) => [
                  styles.dayRow,
                  pressed && styles.dayRowPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`${item.day} forecast. Tap to ${isExpanded ? 'collapse' : 'expand'} hourly breakdown`}
                accessibilityState={{ expanded: isExpanded }}>
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
                      color={isToday ? BrandColors.primaryLight : DarkThemeColors.textMuted}
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
              </Pressable>

              {/* Targeted Inline Expansion: Hourly Breakdown */}
              {isExpanded && item.hourly && (
                <View style={styles.hourlyContainer}>
                  <Text style={styles.hourlyHeader}>HOURLY PRECIPITATION & TEMPERATURE</Text>
                  <View style={styles.hourlyRow}>
                    {item.hourly.map((hour) => (
                      <View key={hour.time} style={styles.hourlyCard}>
                        <Text style={styles.hourTime}>{hour.time}</Text>
                        <Text style={styles.hourTemp}>{hour.temp}°</Text>
                        <Text style={styles.hourRain}>{hour.rainChance}%</Text>
                        <Text style={styles.hourCondition}>{hour.condition}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
  },
  daysList: {
    gap: 2,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
  },
  dayRowPressed: {
    opacity: 0.7,
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
    borderRadius: BorderRadius.sm,
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
  hourlyContainer: {
    backgroundColor: 'rgba(6, 16, 30, 0.75)',
    borderRadius: BorderRadius.md,
    padding: 10,
    marginBottom: 8,
    borderWidth: 0.8,
    borderColor: 'rgba(56, 189, 248, 0.16)',
    gap: 8,
  },
  hourlyHeader: {
    color: DarkThemeColors.textMuted,
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  hourlyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  hourlyCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(17, 31, 48, 0.6)',
    borderRadius: BorderRadius.sm,
    paddingVertical: 6,
    paddingHorizontal: 4,
    gap: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(56, 189, 248, 0.12)',
  },
  hourTime: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  hourTemp: {
    color: DarkThemeColors.textPrimary,
    fontSize: 12.5,
    fontWeight: '700',
  },
  hourRain: {
    color: BrandColors.primaryLight,
    fontSize: 10,
    fontWeight: '600',
  },
  hourCondition: {
    color: DarkThemeColors.textSecondary,
    fontSize: 9,
    fontWeight: '500',
  },
});
