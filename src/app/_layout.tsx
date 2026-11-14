import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppTabs from '@/components/app-tabs';
import { LoadingScreen } from '@/components/loading-screen';
import { DarkThemeColors, LightThemeColors } from '@/theme';

SplashScreen.preventAutoHideAsync();

const AquaAlertLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: LightThemeColors.primary,
    background: LightThemeColors.background,
    card: LightThemeColors.surface,
    text: LightThemeColors.textPrimary,
    border: LightThemeColors.outline,
    notification: LightThemeColors.primary,
  },
};

const AquaAlertDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: DarkThemeColors.primary,
    background: DarkThemeColors.background,
    card: DarkThemeColors.surface,
    text: DarkThemeColors.textPrimary,
    border: DarkThemeColors.outlineSubtle,
    notification: DarkThemeColors.primary,
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? AquaAlertDarkTheme : AquaAlertLightTheme;
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <LoadingScreen onDone={() => setLoadingDone(true)} />
        {loadingDone && <AppTabs />}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
