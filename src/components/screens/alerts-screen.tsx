import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, IconName } from '@/components/dashboard/icon';
import { GlassCard } from '@/components/ui/glass-card';
import { SectionHeader } from '@/components/ui/section-header';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { BorderRadius, Spacing } from '@/constants/theme';
import { BrandColors, DarkThemeColors, SeverityTier } from '@/theme';

interface AlertItem {
  id: string;
  title: string;
  severity: SeverityTier;
  badgeLabel: string;
  icon: IconName;
  timestamp: string;
  body: string;
  directive: string;
}

const ALERTS_DATA: AlertItem[] = [
  {
    id: 'alert-1',
    title: 'Storm Surge Emergency Warning',
    severity: 'critical',
    badgeLabel: 'EMERGENCY ACTIVE',
    icon: 'shield',
    timestamp: 'Issued 12m ago · NOAA NHC',
    body: 'Life-threatening storm surge inundation of 1.8m to 2.4m projected along Biscayne Bay shoreline. Water levels rising rapidly.',
    directive: 'Immediate mandatory evacuation for coastal surge sector Zone A.',
  },
  {
    id: 'alert-2',
    title: 'Flash Flood Watch',
    severity: 'elevated',
    badgeLabel: 'ELEVATED RISK',
    icon: 'alert-triangle',
    timestamp: 'Issued 38m ago · NWS Miami',
    body: 'Continuous torrential rainfall exceeding 65mm/hr will trigger rapid street flooding in low-elevation urban corridors.',
    directive: 'Do not drive through submerged roadways. Turn around, don’t drown.',
  },
  {
    id: 'alert-3',
    title: 'Tropical Gale Wind Advisory',
    severity: 'calm',
    badgeLabel: 'ADVISORY',
    icon: 'cloud-lightning',
    timestamp: 'Issued 1h ago · Coastal Station',
    body: 'Sustained winds of 48 km/h with gusts exceeding 75 km/h. Loose debris and downed tree limbs expected.',
    directive: 'Secure exterior objects, anchor outdoor structures.',
  },
];

type FilterType = 'all' | 'critical' | 'elevated' | 'calm';

export function AlertsScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredAlerts = ALERTS_DATA.filter((a) =>
    filter === 'all' ? true : a.severity === filter
  );

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
        {/* Section Header */}
        <SectionHeader
          icon="bell"
          title="Active Emergency Warnings"
          trailing="3 ACTIVE BULLETINS"
        />

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(['all', 'critical', 'elevated', 'calm'] as const).map((key) => {
            const active = filter === key;
            return (
              <Pressable
                key={key}
                onPress={() => setFilter(key)}
                style={({ pressed }) => [
                  styles.filterPill,
                  active && styles.filterPillActive,
                  pressed && styles.pillPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Filter alerts by ${key}`}>
                <Text
                  style={[
                    styles.filterText,
                    active && styles.filterTextActive,
                  ]}>
                  {key.toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Alert Cards List */}
        {filteredAlerts.map((alert) => (
          <GlassCard
            key={alert.id}
            severity={alert.severity}
            padding={Spacing.three}
            style={styles.alertCard}>
            <View style={styles.cardHeader}>
              <View style={styles.titleCol}>
                <View style={styles.badgeRow}>
                  <SeverityBadge
                    level={alert.severity}
                    label={alert.badgeLabel}
                    showPulseDot={alert.severity === 'critical'}
                  />
                  <Text style={styles.timeText}>{alert.timestamp}</Text>
                </View>
                <Text style={styles.alertTitle}>{alert.title}</Text>
              </View>
            </View>

            <Text style={styles.alertBody}>{alert.body}</Text>

            <View style={styles.directiveRow}>
              <Icon name="location-pin" size={13} color={BrandColors.primaryLight} />
              <Text style={styles.directiveText}>{alert.directive}</Text>
            </View>
          </GlassCard>
        ))}
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
  filterRow: {
    flexDirection: 'row',
    gap: 6,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(11, 24, 40, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
  },
  filterPillActive: {
    backgroundColor: 'rgba(14, 165, 233, 0.22)',
    borderColor: BrandColors.primaryLight,
  },
  pillPressed: {
    opacity: 0.7,
  },
  filterText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  filterTextActive: {
    color: BrandColors.primaryLight,
  },
  alertCard: {
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  titleCol: {
    flex: 1,
    gap: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  alertTitle: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '800',
    fontSize: 14.5,
    letterSpacing: -0.2,
  },
  alertBody: {
    color: DarkThemeColors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  directiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(56, 189, 248, 0.1)',
  },
  directiveText: {
    color: DarkThemeColors.textPrimary,
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
});
