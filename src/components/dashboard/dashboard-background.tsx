import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { DarkThemeColors } from '@/theme';

interface DashboardBackgroundProps extends ViewProps {
  children?: React.ReactNode;
}

export function DashboardBackground({ children, style, ...props }: DashboardBackgroundProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <Image
        source={require('@/assets/dashboardbg.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition="top"
        transition={0}
        priority="high"
        cachePolicy="memory"
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkThemeColors.background,
    overflow: 'hidden',
    position: 'relative',
  },
});
