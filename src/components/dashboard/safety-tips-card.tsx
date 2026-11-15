import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { BorderRadius, Spacing } from '@/constants/theme';
import { DarkThemeColors, SeverityTierTokens } from '@/theme';
import { Icon } from './icon';

interface SafetyTipsCardProps {
  title?: string;
  message?: string;
  badgeLabel?: string;
}

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const DEFAULT_EXTENDED_ADVISORY =
  'Seek higher ground immediately if located in low-lying coastal zones. Avoid driving through flooded roadways, keep emergency communication channels clear, ensure backup battery packs are charged to 100%, and follow localized evacuation directives issued by county disaster management.';

/**
 * Rebuilt Storm Surge Safety Advisory with Targeted Expand/Collapse.
 * Collapses to 2 lines with a "Read More" trigger to maintain concise screen rhythm,
 * smoothly expanding into full emergency directives upon user request.
 */
export function SafetyTipsCard({
  title = 'Storm Surge Safety Advisory',
  message = DEFAULT_EXTENDED_ADVISORY,
  badgeLabel = 'EMERGENCY PROTOCOL ACTIVE',
}: SafetyTipsCardProps) {
  const { width } = useWindowDimensions();
  const [isExpanded, setIsExpanded] = useState(false);
  const criticalTokens = SeverityTierTokens.critical;

  const metrics = useMemo(() => {
    return {
      padding: clamp(Spacing.three, width * 0.04, Spacing.four),
      titleSize: clamp(13.5, width * 0.036, 15.5),
      bodySize: clamp(12, width * 0.031, 13.5),
      shieldSize: clamp(20, width * 0.055, 24),
      shieldBadge: clamp(36, width * 0.095, 42),
    };
  }, [width]);

  return (
    <GlassCard severity="critical" padding={metrics.padding} style={styles.card}>
      <View style={styles.contentRow}>
        {/* Critical Shield Icon Badge */}
        <View
          style={[
            styles.shieldContainer,
            {
              width: metrics.shieldBadge,
              height: metrics.shieldBadge,
              borderRadius: BorderRadius.md,
              backgroundColor: criticalTokens.background,
              borderColor: criticalTokens.border,
            },
          ]}>
          <Icon name="shield" size={metrics.shieldSize} color={criticalTokens.text} />
        </View>

        <View style={styles.textContainer}>
          {/* Header Row: Title + Critical Status Dot */}
          <View style={styles.titleRow}>
            <Text style={[styles.title, { fontSize: metrics.titleSize }]}>
              {title}
            </Text>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: criticalTokens.text },
              ]}
            />
          </View>

          {/* Advisory Copy with Targeted 2-line Clamp */}
          <Text
            style={[
              styles.message,
              {
                fontSize: metrics.bodySize,
                lineHeight: metrics.bodySize * 1.45,
              },
            ]}
            numberOfLines={isExpanded ? undefined : 2}>
            {message}
          </Text>

          {/* Targeted Expand Toggle Button */}
          <Pressable
            onPress={() => setIsExpanded((prev) => !prev)}
            style={({ pressed }) => [
              styles.expandToggle,
              pressed && styles.togglePressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={isExpanded ? 'Collapse safety advisory' : 'Read more safety directives'}>
            <Text style={[styles.expandToggleText, { color: criticalTokens.text }]}>
              {isExpanded ? 'Read Less ↑' : 'Read More ↓'}
            </Text>
          </Pressable>

          {/* Severity Badge (Zero hyperlink styling) */}
          <View style={styles.actionRow}>
            <SeverityBadge
              level="critical"
              label={badgeLabel}
              showPulseDot
            />
          </View>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  shieldContainer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  message: {
    color: DarkThemeColors.textSecondary,
    fontWeight: '400',
  },
  expandToggle: {
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  togglePressed: {
    opacity: 0.7,
  },
  expandToggleText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
