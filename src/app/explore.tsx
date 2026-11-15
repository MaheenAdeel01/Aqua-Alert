import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Aqua Alert Design System</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            Centralized design system for disaster management &{'\n'}emergency response.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView
                type="surfaceVariant"
                style={[styles.linkButton, { borderColor: theme.outlineSubtle, borderWidth: 1 }]}>
                <ThemedText type="link" themeColor="primary">
                  Documentation & Guidelines
                </ThemedText>
                <SymbolView
                  tintColor={theme.primary}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </ThemedView>

        <ThemedView style={styles.sectionsWrapper}>
          <Collapsible title="Brand Colors & Identity">
            <ThemedText type="small">
              Aqua Alert primary identity is anchored in{' '}
              <ThemedText type="code">Primary (#0EA5E9)</ThemedText> and{' '}
              <ThemedText type="code">Secondary (#14B8A6)</ThemedText> with dedicated light, dark,
              and soft tones.
            </ThemedText>
            <ThemedText type="small">
              Dual-theme support features high-contrast backgrounds:{' '}
              <ThemedText type="code">#081321</ThemedText> (Dark) and{' '}
              <ThemedText type="code">#F8FAFC</ThemedText> (Light).
            </ThemedText>
          </Collapsible>

          <Collapsible title="Disaster-Specific Taxonomy">
            <ThemedText type="small">
              Dedicated color coding for disaster events: Flood (#0284C7), Flash Flood (#06B6D4),
              Earthquake (#F97316), Heatwave (#F59E0B), Landslide (#A16207), Cyclone (#8B5CF6),
              Wildfire (#DC2626), and Drought (#84934A).
            </ThemedText>
          </Collapsible>

          <Collapsible title="Emergency Severity Levels">
            <ThemedText type="small">
              Emergency severity is strictly separated from disaster type:
            </ThemedText>
            <ThemedText type="small">
              • Level 0 - Normal: <ThemedText type="code">#22C55E</ThemedText>
              {'\n'}• Level 1 - Advisory: <ThemedText type="code">#38BDF8</ThemedText>
              {'\n'}• Level 2 - Watch: <ThemedText type="code">#FACC15</ThemedText>
              {'\n'}• Level 3 - Warning: <ThemedText type="code">#F97316</ThemedText>
              {'\n'}• Level 4 - Emergency: <ThemedText type="code">#DC2626</ThemedText>
            </ThemedText>
          </Collapsible>

          <Collapsible title="Semantic & Gradient Tokens">
            <ThemedText type="small">
              Standardized semantic feedback (Success, Warning, Error/Critical, Information,
              Emergency Purple) with corresponding soft variants, and multi-stop gradients for
              dashboards and elevation.
            </ThemedText>
          </Collapsible>
        </ThemedView>
        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
});
