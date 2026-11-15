import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { DashboardBackground } from '@/components/dashboard/dashboard-background';
import { MapScreen } from '@/components/screens/map-screen';
import { BottomNav } from '@/components/ui/bottom-nav';

export default function ExploreScreen() {
  return (
    <DashboardBackground>
      <StatusBar style="light" />
      <MapScreen />
      <BottomNav currentTab="map" />
    </DashboardBackground>
  );
}
