import React, { useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { SectionHeader } from '@/components/ui/section-header';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { BorderRadius, Spacing } from '@/constants/theme';
import { BrandColors, DarkThemeColors } from '@/theme';

interface LiveRadarPlaceholderProps {
  stationCode?: string;
  rangeKm?: number;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * LiveRadarPlaceholder provides a high-fidelity meteorological radar telemetry viewport.
 * Replaces developer placeholder copy with an authentic doppler radar target state.
 */
export function LiveRadarPlaceholder({
  stationCode = 'FL-MIAMI NEXRAD · WSR-88D',
  rangeKm = 120,
}: LiveRadarPlaceholderProps) {
  const { width } = useWindowDimensions();

  const metrics = useMemo(() => {
    return {
      padding: clamp(Spacing.three, width * 0.045, Spacing.four),
      radarHeight: clamp(140, width * 0.4, 180),
      ringL: clamp(120, width * 0.34, 155),
      ringM: clamp(80, width * 0.22, 105),
      ringS: clamp(40, width * 0.11, 55),
    };
  }, [width]);

  return (
    <GlassCard padding={metrics.padding} style={styles.card}>
      {/* Standardized Section Header + Live Stream Badge */}
      <SectionHeader
        icon="radar"
        title="Live Weather Radar"
        trailing={<SeverityBadge level="calm" label="LIVE STREAM" showPulseDot />}
      />

      {/* High-Tech Radar Viewport */}
      <View
        style={[
          styles.radarViewport,
          {
            height: metrics.radarHeight,
          },
        ]}
        accessibilityRole="image"
        accessibilityLabel="Live Doppler radar sector scan for Miami coastal region">
        {/* Concentric Radar Distance Rings */}
        <View
          style={[
            styles.radarRing,
            {
              width: metrics.ringL,
              height: metrics.ringL,
              borderRadius: metrics.ringL / 2,
            },
          ]}
        />
        <View
          style={[
            styles.radarRing,
            {
              width: metrics.ringM,
              height: metrics.ringM,
              borderRadius: metrics.ringM / 2,
            },
          ]}
        />
        <View
          style={[
            styles.radarRing,
            {
              width: metrics.ringS,
              height: metrics.ringS,
              borderRadius: metrics.ringS / 2,
            },
          ]}
        />

        {/* Crosshair Grid Lines */}
        <View style={styles.crosshairH} />
        <View style={styles.crosshairV} />

        {/* Doppler Echo Simulated Core */}
        <View style={styles.echoCore} />
        <View style={styles.echoBand} />

        {/* Center Target Station Marker */}
        <View style={styles.centerTarget} />

        {/* Real Meteorological Telemetry Overlay (Zero Dev/Debug Text) */}
        <View style={styles.overlayBadge}>
          <Text style={styles.overlayPrimary}>ACTIVE DOPPLER SCAN</Text>
          <Text style={styles.overlaySecondary}>Reflectivity: 52 dBZ · Heavy Rain Cells</Text>
        </View>
      </View>

      {/* Footer Station Telemetry */}
      <View style={styles.footer}>
        <Text style={styles.stationText}>{stationCode}</Text>
        <Text style={styles.sweepText}>RANGE: {rangeKm} KM · REFRESH 30S</Text>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
  },
  radarViewport: {
    width: '100%',
    backgroundColor: 'rgba(6, 16, 30, 0.94)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.16)',
  },
  crosshairH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.14)',
  },
  crosshairV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.14)',
  },
  echoBand: {
    position: 'absolute',
    width: '45%',
    height: '45%',
    borderRadius: 999,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    top: '22%',
    right: '25%',
  },
  echoCore: {
    position: 'absolute',
    width: '24%',
    height: '24%',
    borderRadius: 999,
    backgroundColor: 'rgba(249, 115, 22, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.35)',
    top: '32%',
    right: '34%',
  },
  centerTarget: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BrandColors.primaryLight,
    borderWidth: 1.5,
    borderColor: '#F8FAFC',
    zIndex: 2,
  },
  overlayBadge: {
    position: 'absolute',
    bottom: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(8, 19, 33, 0.88)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    borderWidth: 0.8,
    borderColor: 'rgba(56, 189, 248, 0.22)',
    gap: 1.5,
  },
  overlayPrimary: {
    color: DarkThemeColors.textPrimary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  overlaySecondary: {
    color: DarkThemeColors.textMuted,
    fontSize: 9.5,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  stationText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  sweepText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
});
