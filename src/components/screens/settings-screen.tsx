import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '@/components/ui/glass-card';
import { SectionHeader } from '@/components/ui/section-header';
import { BorderRadius, Spacing } from '@/constants/theme';
import { BrandColors, DarkThemeColors, SeverityColors } from '@/theme';

export function SettingsScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [speedUnit, setSpeedUnit] = useState<'kmh' | 'mph'>('kmh');
  const [sirensEnabled, setSirensEnabled] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [cacheCleared, setCacheCleared] = useState(false);

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
          icon="settings"
          title="System Preferences"
          trailing="BUILD 1.0.4"
        />

        {/* Measurement Units Group */}
        <GlassCard padding={Spacing.three} style={styles.groupCard}>
          <Text style={styles.groupHeader}>MEASUREMENT UNITS</Text>

          {/* Temperature Unit */}
          <View style={styles.settingRow}>
            <View style={styles.textGroup}>
              <Text style={styles.settingLabel}>Temperature Units</Text>
              <Text style={styles.settingDesc}>Current: {tempUnit === 'C' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}</Text>
            </View>
            <View style={styles.toggleGroup}>
              <Pressable
                onPress={() => setTempUnit('C')}
                style={({ pressed }) => [
                  styles.toggleBtn,
                  tempUnit === 'C' && styles.toggleBtnActive,
                  pressed && styles.btnPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Set Celsius">
                <Text style={[styles.toggleText, tempUnit === 'C' && styles.toggleTextActive]}>
                  °C
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setTempUnit('F')}
                style={({ pressed }) => [
                  styles.toggleBtn,
                  tempUnit === 'F' && styles.toggleBtnActive,
                  pressed && styles.btnPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Set Fahrenheit">
                <Text style={[styles.toggleText, tempUnit === 'F' && styles.toggleTextActive]}>
                  °F
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Wind Speed Unit */}
          <View style={styles.settingRow}>
            <View style={styles.textGroup}>
              <Text style={styles.settingLabel}>Wind & Surge Velocity</Text>
              <Text style={styles.settingDesc}>Current: {speedUnit === 'kmh' ? 'Kilometers/hour' : 'Miles/hour'}</Text>
            </View>
            <View style={styles.toggleGroup}>
              <Pressable
                onPress={() => setSpeedUnit('kmh')}
                style={({ pressed }) => [
                  styles.toggleBtn,
                  speedUnit === 'kmh' && styles.toggleBtnActive,
                  pressed && styles.btnPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Set kilometers per hour">
                <Text style={[styles.toggleText, speedUnit === 'kmh' && styles.toggleTextActive]}>
                  km/h
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSpeedUnit('mph')}
                style={({ pressed }) => [
                  styles.toggleBtn,
                  speedUnit === 'mph' && styles.toggleBtnActive,
                  pressed && styles.btnPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Set miles per hour">
                <Text style={[styles.toggleText, speedUnit === 'mph' && styles.toggleTextActive]}>
                  mph
                </Text>
              </Pressable>
            </View>
          </View>
        </GlassCard>

        {/* Emergency Alert Protocols */}
        <GlassCard padding={Spacing.three} style={styles.groupCard}>
          <Text style={styles.groupHeader}>CRITICAL ALERT SIGNALS</Text>

          <View style={styles.settingRow}>
            <View style={styles.textGroup}>
              <Text style={styles.settingLabel}>Emergency Audio Sirens</Text>
              <Text style={styles.settingDesc}>Overrides silent mode for Category 3+ surge evacuations</Text>
            </View>
            <Switch
              value={sirensEnabled}
              onValueChange={setSirensEnabled}
              trackColor={{ false: '#1C2D42', true: BrandColors.primaryLight }}
              thumbColor={sirensEnabled ? '#FFFFFF' : '#94A3B8'}
              accessibilityLabel="Toggle Emergency Audio Sirens"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.textGroup}>
              <Text style={styles.settingLabel}>High-Priority Flash Alerts</Text>
              <Text style={styles.settingDesc}>Immediate device wakeup on flood watch triggers</Text>
            </View>
            <Switch
              value={pushAlerts}
              onValueChange={setPushAlerts}
              trackColor={{ false: '#1C2D42', true: BrandColors.primaryLight }}
              thumbColor={pushAlerts ? '#FFFFFF' : '#94A3B8'}
              accessibilityLabel="Toggle High-Priority Flash Alerts"
            />
          </View>
        </GlassCard>

        {/* Telemetry Cache & Attributions */}
        <GlassCard padding={Spacing.three} style={styles.groupCard}>
          <Text style={styles.groupHeader}>OFFLINE DATA & TELEMETRY CACHE</Text>

          <View style={styles.settingRow}>
            <View style={styles.textGroup}>
              <Text style={styles.settingLabel}>Offline Radar & Model Cache</Text>
              <Text style={styles.settingDesc}>
                {cacheCleared ? 'Cache cleared · 0 KB' : '42.8 MB stored · Valid for 24h offline'}
              </Text>
            </View>
            <Pressable
              onPress={() => setCacheCleared(true)}
              style={({ pressed }) => [
                styles.clearBtn,
                pressed && styles.btnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Clear cached offline telemetry data">
              <Text style={styles.clearBtnText}>{cacheCleared ? 'CLEARED' : 'PURGE'}</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.attributionText}>
            Meteorological models powered by NOAA National Hurricane Center (NHC) and National Weather Service (NWS Miami WSR-88D Doppler).
          </Text>
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
  groupCard: {
    gap: 10,
  },
  groupHeader: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44, // 44px min touch target
    gap: 12,
  },
  textGroup: {
    flex: 1,
    gap: 2,
  },
  settingLabel: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    fontSize: 13.5,
  },
  settingDesc: {
    color: DarkThemeColors.textSecondary,
    fontSize: 11.5,
    lineHeight: 16,
  },
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(8, 20, 36, 0.9)',
    borderRadius: BorderRadius.sm,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
  },
  toggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm - 2,
    minWidth: 44,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(14, 165, 233, 0.3)',
    borderColor: BrandColors.primaryLight,
  },
  btnPressed: {
    opacity: 0.7,
  },
  toggleText: {
    color: DarkThemeColors.textMuted,
    fontSize: 11.5,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: BrandColors.primaryLight,
    fontWeight: '800',
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(220, 38, 38, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.35)',
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearBtnText: {
    color: SeverityColors.emergency,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  attributionText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10.5,
    lineHeight: 15,
    paddingTop: 2,
  },
});
