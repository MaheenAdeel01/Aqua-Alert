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

import { Icon } from '@/components/dashboard/icon';
import { GlassCard } from '@/components/ui/glass-card';
import { SectionHeader } from '@/components/ui/section-header';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { BorderRadius, Spacing } from '@/constants/theme';
import { BrandColors, DarkThemeColors, SeverityColors } from '@/theme';

const MAP_LAYERS = [
  { key: 'doppler', label: 'Doppler Radar' },
  { key: 'surge', label: 'Surge Zones' },
  { key: 'evac', label: 'Evac Routes' },
  { key: 'shelters', label: 'Shelters' },
] as const;

type MapLayerKey = (typeof MAP_LAYERS)[number]['key'];

export function MapScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [activeLayers, setActiveLayers] = useState<Record<MapLayerKey, boolean>>({
    doppler: true,
    surge: true,
    evac: false,
    shelters: true,
  });

  const toggleLayer = (key: MapLayerKey) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
          icon="map"
          title="Tactical Storm Map"
          trailing={<SeverityBadge level="critical" label="STORM SURGE WARNING" showPulseDot />}
        />

        {/* Map Viewport Card */}
        <GlassCard padding={Spacing.three} style={styles.mapCard}>
          <View style={styles.mapViewport}>
            {/* Compass Rose / Coordinate HUD */}
            <View style={styles.coordHud}>
              <Icon name="location-pin" size={14} color={BrandColors.primaryLight} />
              <Text style={styles.coordText}>25.7617° N, 80.1918° W · MIAMI-DADE</Text>
            </View>

            {/* Radar Sweep Arc Overlay */}
            {activeLayers.doppler && (
              <>
                <View style={[styles.radarRing, { width: 280, height: 280, borderRadius: 140 }]} />
                <View style={[styles.radarRing, { width: 180, height: 180, borderRadius: 90 }]} />
                <View style={[styles.radarRing, { width: 90, height: 90, borderRadius: 45 }]} />
                <View style={styles.echoStorm} />
              </>
            )}

            {/* Surge Risk Zones */}
            {activeLayers.surge && (
              <View style={styles.surgeZone}>
                <Text style={styles.surgeZoneText}>ZONE A · CRITICAL INUNDATION</Text>
              </View>
            )}

            {/* Emergency Shelter Markers */}
            {activeLayers.shelters && (
              <View style={styles.shelterMarker}>
                <Icon name="shield" size={14} color={SeverityColors.emergency} />
                <Text style={styles.shelterText}>OPEN SHELTER: E12</Text>
              </View>
            )}
          </View>

          {/* Layer Filter Controls */}
          <View style={styles.layerRow}>
            {MAP_LAYERS.map((layer) => {
              const active = activeLayers[layer.key];
              return (
                <Pressable
                  key={layer.key}
                  onPress={() => toggleLayer(layer.key)}
                  style={({ pressed }) => [
                    styles.layerChip,
                    active && styles.layerChipActive,
                    pressed && styles.chipPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Toggle ${layer.label} layer`}
                  accessibilityState={{ selected: active }}>
                  <Text
                    style={[
                      styles.layerChipText,
                      active && styles.layerChipTextActive,
                    ]}>
                    {layer.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </GlassCard>

        {/* Coastal Evacuation Status Card */}
        <GlassCard severity="elevated" padding={Spacing.three} style={styles.infoCard}>
          <View style={styles.statusHeader}>
            <Icon name="alert-triangle" size={16} color={SeverityColors.warning} />
            <Text style={styles.statusTitle}>Zone A Evacuation Mandatory</Text>
          </View>
          <Text style={styles.statusBody}>
            Biscayne Bay barrier islands and coastal low-lying areas must execute emergency flood evacuation by 18:00 EST. Causeways subject to water closure upon 1.2m surge onset.
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
  mapCard: {
    gap: 12,
  },
  mapViewport: {
    width: '100%',
    height: 240,
    backgroundColor: 'rgba(6, 16, 30, 0.95)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coordHud: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(8, 19, 33, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    borderWidth: 0.8,
    borderColor: 'rgba(56, 189, 248, 0.2)',
    zIndex: 10,
  },
  coordText: {
    color: DarkThemeColors.textMuted,
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  radarRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.16)',
  },
  echoStorm: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    top: '30%',
    right: '25%',
  },
  surgeZone: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(220, 38, 38, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.45)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  surgeZoneText: {
    color: '#FCA5A5',
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  shelterMarker: {
    position: 'absolute',
    top: 45,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(8, 19, 33, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  shelterText: {
    color: DarkThemeColors.textPrimary,
    fontSize: 9.5,
    fontWeight: '700',
  },
  layerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingTop: 4,
  },
  layerChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(11, 24, 40, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
  },
  layerChipActive: {
    backgroundColor: 'rgba(14, 165, 233, 0.22)',
    borderColor: BrandColors.primaryLight,
  },
  chipPressed: {
    opacity: 0.7,
  },
  layerChipText: {
    color: DarkThemeColors.textMuted,
    fontSize: 10.5,
    fontWeight: '600',
  },
  layerChipTextActive: {
    color: BrandColors.primaryLight,
    fontWeight: '700',
  },
  infoCard: {
    gap: 6,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusTitle: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    fontSize: 13.5,
  },
  statusBody: {
    color: DarkThemeColors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
});
