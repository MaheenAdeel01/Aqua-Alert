import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CurrentWeatherCard } from '@/components/dashboard/current-weather-card';
import { DashboardBackground } from '@/components/dashboard/dashboard-background';
import { DashboardHero } from '@/components/dashboard/dashboard-hero';
import { DashboardNavBar } from '@/components/dashboard/dashboard-nav-bar';
import { ForecastOverviewCard } from '@/components/dashboard/forecast-overview-card';
import { LiveRadarPlaceholder } from '@/components/dashboard/live-radar-placeholder';
import { RiskMetricsRow } from '@/components/dashboard/risk-metrics-row';
import { SafetyTipsCard } from '@/components/dashboard/safety-tips-card';

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <DashboardBackground>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Math.max(insets.bottom, 16) + 95,
            maxWidth: Math.min(width, 540),
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {/* Dynamic Hero Section preserving upper-right cyclone */}
        <DashboardHero userName="Alex" locationName="Miami, Florida" />

        {/* Telemetry Stream */}
        <View style={styles.contentBody}>
          <CurrentWeatherCard />
          <RiskMetricsRow />
          <LiveRadarPlaceholder />
          <ForecastOverviewCard />
          <SafetyTipsCard />
        </View>
      </ScrollView>

      {/* Professional 5-Item Fixed Bottom Navigation Bar */}
      <DashboardNavBar />
    </DashboardBackground>
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
});
