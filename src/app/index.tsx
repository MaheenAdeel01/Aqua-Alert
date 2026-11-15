import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardBackground } from '@/components/dashboard/dashboard-background';
import { DashboardHero } from '@/components/dashboard/dashboard-hero';

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
            paddingBottom: Math.max(insets.bottom, 16) + 70,
            maxWidth: Math.min(width, 540),
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {/* Dynamic Hero Section preserving upper-right cyclone */}
        <DashboardHero userName="Alex" locationName="Miami, Florida" />

        {/* Phase 2, 3, 4 components will slot in here */}
        <View style={styles.contentBody} />
      </ScrollView>
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
