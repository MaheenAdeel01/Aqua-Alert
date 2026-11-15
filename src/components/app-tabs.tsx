import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { DarkThemeColors } from '@/theme';

export default function AppTabs() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkThemeColors.background,
  },
});
