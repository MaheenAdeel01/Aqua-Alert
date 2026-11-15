import React, { useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { BrandColors, DarkThemeColors } from '@/theme';
import { Icon } from './icon';

interface LiveRadarPlaceholderProps {
  stationCode?: string;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function LiveRadarPlaceholder({
  stationCode = 'DOPPLER-RADAR · SECTOR 04',
}: LiveRadarPlaceholderProps) {
  const { width } = useWindowDimensions();

  const metrics = useMemo(() => {
    return {
      padding: clamp(16, width * 0.045, 20),
      radius: clamp(16, width * 0.045, 20),
      radarHeight: clamp(130, width * 0.38, 170),
      titleSize: clamp(14, width * 0.038, 16.5),
      radarRingL: clamp(120, width * 0.34, 155),
      radarRingM: clamp(80, width * 0.22, 105),
      radarRingS: clamp(40, width * 0.11, 55),
    };
  }, [width]);

  return (
    <View
      style={[
        styles.card,
        {
          padding: metrics.padding,
          borderRadius: metrics.radius,
        },
      ]}>
      {/* Header: Title + Live Status Indicator */}
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Icon name="radar" size={18} color={BrandColors.primaryLight} />
          <Text style={[styles.title, { fontSize: metrics.titleSize }]}>
            Live Weather Radar
          </Text>
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.liveText}>LIVE STREAM</Text>
        </View>
      </View>

      {/* High-Tech Radar Canvas Container */}
      <View
        style={[
          styles.radarViewport,
          {
            height: metrics.radarHeight,
          },
        ]}>
        {/* Concentric Radar Distance Rings */}
        <View
          style={[
            styles.radarRing,
            {
              width: metrics.radarRingL,
              height: metrics.radarRingL,
              borderRadius: metrics.radarRingL / 2,
            },
          ]}
        />
        <View
          style={[
            styles.radarRing,
            {
              width: metrics.radarRingM,
              height: metrics.radarRingM,
              borderRadius: metrics.radarRingM / 2,
            },
          ]}
        />
        <View
          style={[
            styles.radarRing,
            {
              width: metrics.radarRingS,
              height: metrics.radarRingS,
              borderRadius: metrics.radarRingS / 2,
            },
          ]}
        />

        {/* Crosshair Grid Lines */}
        <View style={styles.crosshairH} />
        <View style={styles.crosshairV} />

        {/* Center Target Marker */}
        <View style={styles.centerTarget} />

        {/* Telemetry Overlay Label */}
        <View style={styles.overlayMessage}>
          <Text style={styles.overlayPrimary}>Custom 3D Globe Visualization</Text>
          <Text style={styles.overlaySecondary}>Interactive layer container ready</Text>
        </View>
      </View>

      {/* Footer Station Telemetry */}
      <View style={styles.footer}>
        <Text style={styles.stationText}>{stationCode}</Text>
        <Text style={styles.sweepText}>RANGE: 120 KM · REFRESH 30S</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(17, 31, 48, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.22)',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BrandColors.primaryLight,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  liveText: {
    color: BrandColors.primaryLight,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  radarViewport: {
    width: '100%',
    backgroundColor: 'rgba(6, 16, 30, 0.92)',
    borderRadius: 14,
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
  centerTarget: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BrandColors.primaryLight,
    borderWidth: 1.5,
    borderColor: '#F8FAFC',
  },
  overlayMessage: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(11, 24, 40, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: 'rgba(56, 189, 248, 0.22)',
    gap: 2,
  },
  overlayPrimary: {
    color: DarkThemeColors.textPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  overlaySecondary: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  stationText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sweepText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
});
