import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import {
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CurrentWeatherCard } from '@/components/dashboard/current-weather-card';
import { DashboardBackground } from '@/components/dashboard/dashboard-background';
import { DashboardHero } from '@/components/dashboard/dashboard-hero';
import { ForecastOverviewCard } from '@/components/dashboard/forecast-overview-card';
import { LiveRadarPlaceholder } from '@/components/dashboard/live-radar-placeholder';
import { RiskMetricsRow } from '@/components/dashboard/risk-metrics-row';
import { SafetyTipsCard } from '@/components/dashboard/safety-tips-card';
import { StickyDashboardHeader } from '@/components/dashboard/sticky-dashboard-header';
import { AlertsScreen } from '@/components/screens/alerts-screen';
import { AnalyticsScreen } from '@/components/screens/analytics-screen';
import { MapScreen } from '@/components/screens/map-screen';
import { SettingsScreen } from '@/components/screens/settings-screen';
import { AnimatedEntrance } from '@/components/ui/animated-entrance';
import { BottomNav, NavTabKey } from '@/components/ui/bottom-nav';
import { CustomRefreshIndicator } from '@/components/ui/custom-refresh-indicator';
import { Spacing } from '@/constants/theme';

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const [currentTab, setCurrentTab] = useState<NavTabKey>('home');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshKey((prev) => prev + 1);
    }, 1200);
  }, []);

  return (
    <DashboardBackground>
      <StatusBar style="light" />

      {/* Condensing Sticky Header past scroll threshold (Home Tab Only) */}
      {currentTab === 'home' && (
        <StickyDashboardHeader
          scrollY={scrollY}
          threshold={105}
          locationName="Miami, Florida"
          temperature={28}
          condition="Severe Tropical Storm"
        />
      )}

      {/* TAB 1: HOME DASHBOARD */}
      {currentTab === 'home' && (
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: Math.max(insets.bottom, Spacing.three) + 95,
              maxWidth: Math.min(width, 540),
            },
          ]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="transparent"
              colors={['#0EA5E9']}
            />
          }>
          {/* Custom On-Brand Radar/Droplet Refresh Motif */}
          <CustomRefreshIndicator refreshing={refreshing} />

          {/* Dynamic Hero Section with Stagger 0ms */}
          <AnimatedEntrance delay={0} offsetY={12}>
            <DashboardHero locationName="Miami, Florida" />
          </AnimatedEntrance>

          {/* Telemetry Stream with Cascading 80ms Staggers */}
          <View style={styles.contentBody} key={refreshKey}>
            {/* Stagger 1: Current Conditions Hero Card (80ms) */}
            <AnimatedEntrance delay={80}>
              <CurrentWeatherCard />
            </AnimatedEntrance>

            {/* Stagger 2: Single-Glance Fixed-Height Risk Metrics (160ms) */}
            <AnimatedEntrance delay={160}>
              <RiskMetricsRow />
            </AnimatedEntrance>

            {/* Stagger 3: Live Radar with Fullscreen Pan/Zoom Expansion (240ms) */}
            <AnimatedEntrance delay={240}>
              <LiveRadarPlaceholder />
            </AnimatedEntrance>

            {/* Stagger 4: 4-Day Forecast with Inline Hourly Expansion (320ms) */}
            <AnimatedEntrance delay={320}>
              <ForecastOverviewCard />
            </AnimatedEntrance>

            {/* Stagger 5: Storm Surge Safety Advisory with 2-line clamp & expand (400ms) */}
            <AnimatedEntrance delay={400}>
              <SafetyTipsCard />
            </AnimatedEntrance>
          </View>
        </Animated.ScrollView>
      )}

      {/* TAB 2: TACTICAL MAP */}
      {currentTab === 'map' && <MapScreen />}

      {/* TAB 3: EMERGENCY ALERTS */}
      {currentTab === 'alerts' && <AlertsScreen />}

      {/* TAB 4: ATMOSPHERIC ANALYTICS */}
      {currentTab === 'analytics' && <AnalyticsScreen />}

      {/* TAB 5: SYSTEM PREFERENCES */}
      {currentTab === 'settings' && <SettingsScreen />}

      {/* Unified 5-Item Fixed Bottom Navigation Bar */}
      <BottomNav currentTab={currentTab} onTabSelect={setCurrentTab} />
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
