import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '@/components/ui/glass-card';
import { SectionHeader } from '@/components/ui/section-header';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { StatCard } from '@/components/ui/stat-card';
import { Spacing } from '@/constants/theme';
import { BrandColors, DarkThemeColors } from '@/theme';

const PRESSURE_TREND = [
  { time: '06:00', val: 1004 },
  { time: '09:00', val: 1001 },
  { time: '12:00', val: 997 },
  { time: '15:00', val: 994 },
  { time: '18:00', val: 992 },
];

export function AnalyticsScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: Math.max(insets.top, 16) + 8,
          paddingBottom: Math.max(insets.bottom, 16) + 95,
          maxWidth: Math.min(width, 540),
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.contentBody}>
        {/* Header */}
        <SectionHeader
          icon="analytics"
          title="Atmospheric Analytics"
          trailing={<SeverityBadge level="elevated" label="RAPID PRESSURE DROP" />}
        />

        {/* Dual Primary Metrics Row (Identical pixel structure via StatCard) */}
        <View style={styles.statRow}>
          <StatCard
            icon="thermometer"
            label="Barometric Pressure"
            value="992 hPa"
            caption="Dropping 3.2 hPa/hr"
            severity="elevated"
            progress={74}
          />
          <StatCard
            icon="cloud-lightning"
            label="Peak Wind Velocity"
            value="78 km/h"
            caption="Max gust recorded 94 km/h"
            severity="critical"
            progress={88}
          />
        </View>

        {/* Barometric Pressure Gradient History Card */}
        <GlassCard padding={Spacing.three} style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Barometric Pressure Gradient (12H)</Text>
            <Text style={styles.chartSub}>TENDENCY: STEEP FALL</Text>
          </View>

          {/* Precision Barometric Trend Sparkline Grid */}
          <View style={styles.sparklineGrid}>
            {PRESSURE_TREND.map((p, idx) => {
              // Normalize 990-1006 range to bar height 20-80
              const normalizedHeight = Math.max(20, Math.min(80, (p.val - 988) * 4.5));
              const isCurrent = idx === PRESSURE_TREND.length - 1;

              return (
                <View key={p.time} style={styles.sparkCol}>
                  <Text style={[styles.sparkVal, isCurrent && styles.sparkValCyan]}>
                    {p.val}
                  </Text>
                  <View style={styles.sparkTrack}>
                    <View
                      style={[
                        styles.sparkFill,
                        {
                          height: normalizedHeight,
                          backgroundColor: isCurrent ? BrandColors.primaryLight : '#475569',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.sparkTime}>{p.time}</Text>
                </View>
              );
            })}
          </View>
        </GlassCard>

        {/* Coastal Oceanographic Surge Wave Height Card */}
        <GlassCard padding={Spacing.three} style={styles.waveCard}>
          <View style={styles.waveHeader}>
            <Text style={styles.chartTitle}>Offshore Buoy Wave Telemetry</Text>
            <SeverityBadge level="critical" label="PEAK SWELL 4.2M" />
          </View>
          <View style={styles.waveStatsRow}>
            <View style={styles.waveItem}>
              <Text style={styles.waveLabel}>SURGE HEIGHT</Text>
              <Text style={styles.waveValCyan}>+1.8 m</Text>
            </View>
            <View style={styles.waveDivider} />
            <View style={styles.waveItem}>
              <Text style={styles.waveLabel}>WAVE PERIOD</Text>
              <Text style={styles.waveVal}>8.4 sec</Text>
            </View>
            <View style={styles.waveDivider} />
            <View style={styles.waveItem}>
              <Text style={styles.waveLabel}>WATER TEMP</Text>
              <Text style={styles.waveVal}>29.4°C</Text>
            </View>
          </View>
        </GlassCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    alignSelf: 'center',
  },
  contentBody: {
    paddingHorizontal: 20,
    gap: 14,
  },
  statRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  chartCard: {
    gap: 14,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartTitle: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    fontSize: 13.5,
  },
  chartSub: {
    color: BrandColors.primaryLight,
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sparklineGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 110,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  sparkCol: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  sparkVal: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  sparkValCyan: {
    color: BrandColors.primaryLight,
    fontWeight: '800',
  },
  sparkTrack: {
    width: 14,
    height: 70,
    backgroundColor: 'rgba(8, 20, 36, 0.9)',
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  sparkFill: {
    width: '100%',
    borderRadius: 7,
  },
  sparkTime: {
    color: DarkThemeColors.textMuted,
    fontSize: 9.5,
    fontWeight: '500',
  },
  waveCard: {
    gap: 12,
  },
  waveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waveStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(56, 189, 248, 0.1)',
  },
  waveItem: {
    alignItems: 'center',
    gap: 3,
  },
  waveLabel: {
    color: DarkThemeColors.textMuted,
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  waveVal: {
    color: DarkThemeColors.textPrimary,
    fontSize: 13.5,
    fontWeight: '700',
  },
  waveValCyan: {
    color: BrandColors.primaryLight,
    fontSize: 13.5,
    fontWeight: '800',
  },
  waveDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
});
