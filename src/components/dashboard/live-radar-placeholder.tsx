import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '@/components/ui/glass-card';
import { SectionHeader } from '@/components/ui/section-header';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { BorderRadius, Spacing } from '@/constants/theme';
import { BrandColors, DarkThemeColors } from '@/theme';
import { Icon } from './icon';

interface LiveRadarPlaceholderProps {
  stationCode?: string;
  rangeKm?: number;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * LiveRadarPlaceholder with Targeted Fullscreen Pan/Zoom Expansion.
 * Dashboard view stays compact (140px–180px); tapping opens the full-screen interactive scope.
 */
export function LiveRadarPlaceholder({
  stationCode = 'FL-MIAMI NEXRAD · WSR-88D',
  rangeKm = 120,
}: LiveRadarPlaceholderProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const metrics = useMemo(() => {
    return {
      padding: clamp(Spacing.three, width * 0.045, Spacing.four),
      radarHeight: clamp(140, width * 0.4, 180),
      ringL: clamp(120, width * 0.34, 155),
      ringM: clamp(80, width * 0.22, 105),
      ringS: clamp(40, width * 0.11, 55),
    };
  }, [width]);

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(1);
  };

  return (
    <>
      <GlassCard
        padding={metrics.padding}
        style={styles.card}
        onPress={openFullscreen}
        accessibilityRole="button"
        accessibilityLabel="Live Weather Radar card. Tap to expand into fullscreen telemetry">
        {/* Standardized Section Header + Live Stream Badge */}
        <SectionHeader
          icon="radar"
          title="Live Weather Radar"
          trailing={
            <View style={styles.headerTrailing}>
              <SeverityBadge level="calm" label="LIVE STREAM" showPulseDot />
              <View style={styles.expandTag}>
                <Text style={styles.expandTagText}>EXPAND</Text>
              </View>
            </View>
          }
        />

        {/* Compact Dashboard Radar Viewport */}
        <View
          style={[
            styles.radarViewport,
            {
              height: metrics.radarHeight,
            },
          ]}>
          {/* Concentric Distance Rings */}
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
          <View style={styles.echoBand} />
          <View style={styles.echoCore} />

          {/* Center Target Station Marker */}
          <View style={styles.centerTarget} />

          {/* Overlay Tag */}
          <View style={styles.overlayBadge}>
            <Text style={styles.overlayPrimary}>TAP TO EXPAND INTERACTIVE RADAR</Text>
            <Text style={styles.overlaySecondary}>Reflectivity: 52 dBZ · Heavy Rain Cells</Text>
          </View>
        </View>

        {/* Footer Station Telemetry */}
        <View style={styles.footer}>
          <Text style={styles.stationText}>{stationCode}</Text>
          <Text style={styles.sweepText}>RANGE: {rangeKm} KM · REFRESH 30S</Text>
        </View>
      </GlassCard>

      {/* Targeted Expand #2: Fullscreen Interactive Pan/Zoom Scope */}
      <Modal
        visible={isFullscreen}
        animationType="fade"
        transparent={false}
        onRequestClose={closeFullscreen}>
        <View
          style={[
            styles.modalContainer,
            {
              paddingTop: Math.max(insets.top, 16),
              paddingBottom: Math.max(insets.bottom, 16),
            },
          ]}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleGroup}>
              <Icon name="radar" size={20} color={BrandColors.primaryLight} />
              <View>
                <Text style={styles.modalTitle}>Interactive Radar Scope</Text>
                <Text style={styles.modalSubtitle}>{stationCode}</Text>
              </View>
            </View>

            <Pressable
              onPress={closeFullscreen}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.btnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Close Fullscreen Radar">
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </Pressable>
          </View>

          {/* Fullscreen Interactive Viewport */}
          <View style={[styles.fullscreenViewport, { height: height * 0.65 }]}>
            <View
              style={[
                styles.fullscreenScope,
                { transform: [{ scale: zoomLevel }] },
              ]}>
              {/* Outer Expanded Distance Rings */}
              <View style={[styles.largeRing, { width: 340, height: 340, borderRadius: 170 }]} />
              <View style={[styles.largeRing, { width: 250, height: 250, borderRadius: 125 }]} />
              <View style={[styles.largeRing, { width: 160, height: 160, borderRadius: 80 }]} />
              <View style={[styles.largeRing, { width: 80, height: 80, borderRadius: 40 }]} />

              <View style={styles.crosshairH} />
              <View style={styles.crosshairV} />

              {/* Storm Cells with Reflectivity Clusters */}
              <View style={[styles.echoBand, { width: 140, height: 140, top: '25%', right: '20%' }]} />
              <View style={[styles.echoCore, { width: 80, height: 80, top: '35%', right: '28%' }]} />
              <View style={[styles.centerTarget, { width: 12, height: 12, borderRadius: 6 }]} />
            </View>

            {/* In-Radar Zoom Controls */}
            <View style={styles.zoomControls}>
              <Pressable
                onPress={() => setZoomLevel((z) => Math.min(z + 0.3, 2.2))}
                style={styles.zoomBtn}
                accessibilityRole="button"
                accessibilityLabel="Zoom In">
                <Text style={styles.zoomBtnText}>+</Text>
              </Pressable>
              <Pressable
                onPress={() => setZoomLevel((z) => Math.max(z - 0.3, 0.8))}
                style={styles.zoomBtn}
                accessibilityRole="button"
                accessibilityLabel="Zoom Out">
                <Text style={styles.zoomBtnText}>−</Text>
              </Pressable>
            </View>
          </View>

          {/* Reflectivity dBZ Legend */}
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>DBZ REFLECTIVITY SCALE</Text>
            <View style={styles.legendBar}>
              <View style={[styles.legendStep, { backgroundColor: '#38BDF8' }]} />
              <View style={[styles.legendStep, { backgroundColor: '#22C55E' }]} />
              <View style={[styles.legendStep, { backgroundColor: '#FACC15' }]} />
              <View style={[styles.legendStep, { backgroundColor: '#F97316' }]} />
              <View style={[styles.legendStep, { backgroundColor: '#DC2626' }]} />
            </View>
            <View style={styles.legendLabels}>
              <Text style={styles.legendLabel}>20 Light</Text>
              <Text style={styles.legendLabel}>35 Moderate</Text>
              <Text style={styles.legendLabel}>50+ Heavy / Surge</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
  },
  headerTrailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandTag: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    borderWidth: 0.8,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  expandTagText: {
    color: BrandColors.primaryLight,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
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
    backgroundColor: 'rgba(8, 19, 33, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    borderWidth: 0.8,
    borderColor: 'rgba(56, 189, 248, 0.22)',
    gap: 1.5,
  },
  overlayPrimary: {
    color: BrandColors.primaryLight,
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  overlaySecondary: {
    color: DarkThemeColors.textMuted,
    fontSize: 9,
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#081321',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(56, 189, 248, 0.15)',
  },
  modalTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '800',
    fontSize: 16,
  },
  modalSubtitle: {
    color: DarkThemeColors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: 'rgba(14, 165, 233, 0.16)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  btnPressed: {
    opacity: 0.7,
  },
  closeButtonText: {
    color: BrandColors.primaryLight,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  fullscreenViewport: {
    width: '100%',
    backgroundColor: 'rgba(6, 16, 30, 0.98)',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenScope: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
  },
  zoomControls: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    gap: 8,
  },
  zoomBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(11, 24, 40, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomBtnText: {
    color: DarkThemeColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  legendContainer: {
    backgroundColor: 'rgba(17, 31, 48, 0.85)',
    borderRadius: BorderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
    gap: 6,
  },
  legendTitle: {
    color: DarkThemeColors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  legendBar: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
  },
  legendStep: {
    flex: 1,
  },
  legendLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendLabel: {
    color: DarkThemeColors.textSecondary,
    fontSize: 9.5,
    fontWeight: '500',
  },
});
