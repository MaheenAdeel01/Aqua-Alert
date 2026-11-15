import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, IconName } from '@/components/dashboard/icon';
import { BrandColors, DarkThemeColors, SeverityColors } from '@/theme';

export type NavTabKey = 'home' | 'map' | 'alerts' | 'analytics' | 'settings';

export interface NavTabItem {
  key: NavTabKey;
  label: string;
  icon: IconName;
  badgeCount?: number;
}

export const NAV_TABS: NavTabItem[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'map', label: 'Map', icon: 'map' },
  { key: 'alerts', label: 'Alerts', icon: 'bell', badgeCount: 2 },
  { key: 'analytics', label: 'Analytics', icon: 'analytics' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
];

export interface BottomNavProps {
  currentTab?: NavTabKey;
  onTabSelect?: (tab: NavTabKey) => void;
  style?: StyleProp<ViewStyle>;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Standardized BottomNav component shared across all five screens (Home, Map, Alerts, Analytics, Settings).
 * Maintains consistent notification dots, active cyan glow indicators, and safe-area bounds.
 */
export function BottomNav({
  currentTab = 'home',
  onTabSelect,
  style,
}: BottomNavProps) {
  const [activeTab, setActiveTab] = useState<NavTabKey>(currentTab);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const handlePress = (tabKey: NavTabKey) => {
    setActiveTab(tabKey);
    onTabSelect?.(tabKey);
  };

  const isCurrent = (tabKey: NavTabKey) => activeTab === tabKey;

  const iconSize = clamp(20, width * 0.052, 23);
  const labelSize = clamp(10, width * 0.027, 11.5);
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 14 : 10);

  return (
    <View style={[styles.barWrapper, { paddingBottom: bottomPadding }, style]}>
      <View style={styles.tabContentContainer}>
        {NAV_TABS.map((tab) => {
          const active = isCurrent(tab.key);
          const itemColor = active ? BrandColors.primaryLight : DarkThemeColors.textMuted;

          return (
            <Pressable
              key={tab.key}
              onPress={() => handlePress(tab.key)}
              style={({ pressed }) => [
                styles.tabButton,
                pressed && styles.tabButtonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`${tab.label} tab`}
              accessibilityState={{ selected: active }}>
              {/* Subtle active indicator pill */}
              <View
                style={[
                  styles.activeIndicator,
                  active && styles.activeIndicatorVisible,
                ]}
              />

              {/* Icon Container with notification dot */}
              <View style={styles.iconContainer}>
                <Icon
                  name={tab.icon}
                  size={iconSize}
                  color={itemColor}
                />
                {tab.badgeCount !== undefined && tab.badgeCount > 0 && !active && (
                  <View style={styles.alertBadgeDot} />
                )}
              </View>

              {/* Tab Label */}
              <Text
                style={[
                  styles.tabLabel,
                  {
                    fontSize: labelSize,
                    color: itemColor,
                    fontWeight: active ? '700' : '500',
                  },
                ]}
                numberOfLines={1}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(8, 19, 33, 0.94)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(56, 189, 248, 0.22)',
    paddingTop: 6,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 999,
  },
  tabContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    maxWidth: 540,
    alignSelf: 'center',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    minHeight: 44, // 44px minimum touch target
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 3,
  },
  tabButtonPressed: {
    opacity: 0.7,
  },
  activeIndicator: {
    width: 20,
    height: 2.5,
    borderRadius: 1.5,
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  activeIndicatorVisible: {
    backgroundColor: BrandColors.primaryLight,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBadgeDot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SeverityColors.warning,
    borderWidth: 1,
    borderColor: '#081321',
  },
  tabLabel: {
    letterSpacing: 0.2,
  },
});
