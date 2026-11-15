import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { BorderRadius, Spacing } from '@/constants/theme';
import { DarkThemeColors, SeverityColors, SeverityTierTokens } from '@/theme';
import { Icon } from './icon';

/**
 * 1. Location Permission Denied State
 * Presented when user disables or rejects location permissions.
 */
export function LocationPermissionDeniedState({
  onRetry,
}: {
  onRetry?: () => void;
}) {
  return (
    <GlassCard severity="elevated" style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconBox, { borderColor: SeverityTierTokens.elevated.border }]}>
          <Icon name="location-pin" size={20} color={SeverityColors.warning} />
        </View>
        <View style={styles.textCol}>
          <View style={styles.badgeRow}>
            <Text style={styles.title}>Location Permission Required</Text>
            <SeverityBadge level="elevated" label="FALLBACK ACTIVE" />
          </View>
          <Text style={styles.desc}>
            Real-time storm alerts need location access. Currently defaulting to Miami Coastal Sector.
          </Text>
          {onRetry && (
            <Pressable
              onPress={onRetry}
              style={({ pressed }) => [
                styles.actionBtn,
                { borderColor: SeverityTierTokens.elevated.border },
                pressed && styles.btnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Enable Location Permissions">
              <Text style={[styles.actionBtnText, { color: SeverityColors.warning }]}>
                Enable Location Permissions
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </GlassCard>
  );
}

/**
 * 2. Offline Mode State
 * Presented when network connection drops, preserving safety telemetry from cache.
 */
export function OfflineState({
  lastSync = '12m ago',
  onRetry,
}: {
  lastSync?: string;
  onRetry?: () => void;
}) {
  return (
    <GlassCard severity="elevated" style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconBox, { borderColor: SeverityTierTokens.elevated.border }]}>
          <Icon name="cloud-lightning" size={20} color={SeverityColors.warning} />
        </View>
        <View style={styles.textCol}>
          <View style={styles.badgeRow}>
            <Text style={styles.title}>Offline Telemetry Mode</Text>
            <SeverityBadge level="elevated" label="OFFLINE" showPulseDot />
          </View>
          <Text style={styles.desc}>
            Using cached storm and flood forecast data from {lastSync}. Reconnecting automatically.
          </Text>
          {onRetry && (
            <Pressable
              onPress={onRetry}
              style={({ pressed }) => [
                styles.actionBtn,
                { borderColor: SeverityTierTokens.elevated.border },
                pressed && styles.btnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Reconnect Now">
              <Text style={[styles.actionBtnText, { color: SeverityColors.warning }]}>
                Reconnect Now
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </GlassCard>
  );
}

/**
 * 3. Failed Data Load State
 * Presented when telemetry fetch fails completely.
 */
export function FailedDataLoadState({
  errorMessage = 'Unable to reach Doppler radar and surge telemetry servers.',
  onRetry,
}: {
  errorMessage?: string;
  onRetry?: () => void;
}) {
  return (
    <GlassCard severity="critical" style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconBox, { borderColor: SeverityTierTokens.critical.border }]}>
          <Icon name="alert-triangle" size={20} color={SeverityColors.emergency} />
        </View>
        <View style={styles.textCol}>
          <View style={styles.badgeRow}>
            <Text style={styles.title}>Telemetry Sync Failed</Text>
            <SeverityBadge level="critical" label="SYNC ERROR" />
          </View>
          <Text style={styles.desc}>{errorMessage}</Text>
          {onRetry && (
            <Pressable
              onPress={onRetry}
              style={({ pressed }) => [
                styles.actionBtn,
                { borderColor: SeverityTierTokens.critical.border },
                pressed && styles.btnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Retry Connection">
              <Text style={[styles.actionBtnText, { color: SeverityColors.emergency }]}>
                Retry Connection
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(8, 20, 36, 0.8)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
    gap: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: -0.2,
    flex: 1,
  },
  desc: {
    color: DarkThemeColors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  actionBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: Spacing.two,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(11, 24, 40, 0.9)',
    borderWidth: 1,
    marginTop: Spacing.one,
    minHeight: 44, // 44px min touch target
    justifyContent: 'center',
  },
  btnPressed: {
    opacity: 0.7,
  },
  actionBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
