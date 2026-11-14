import { Image } from 'expo-image';
import { NavigationBar, setVisibilityAsync } from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandColors, DarkThemeColors } from '@/theme';

const LOADING_BG = DarkThemeColors.background;

export const LOADING_DURATION_MS = 10_000;

const EXIT_DURATION_MS = 450;

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type LoadingScreenProps = {
  durationMs?: number;
  onDone?: () => void;
};

export function LoadingScreen({ durationMs = LOADING_DURATION_MS, onDone }: LoadingScreenProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const bgFade = useSharedValue(0);
  const kenBurns = useSharedValue(0);
  const logoIn = useSharedValue(0);
  const titleIn = useSharedValue(0);
  const footerIn = useSharedValue(0);
  const loaderIn = useSharedValue(0);
  const spin = useSharedValue(0);
  const breathe = useSharedValue(0);
  const exit = useSharedValue(1);

  const metrics = useMemo(() => {
    const compact = height < 700;
    return {
      compact,
      logoSize: clamp(104, Math.min(width * 0.44, height * 0.23), 232),
      titleSize: clamp(36, Math.min(width * 0.15, height * 0.07), 62),
      taglineSize: clamp(12, width * 0.036, 17),
      mottoSize: clamp(16, Math.min(width * 0.05, height * 0.032), 24),
      ringSize: clamp(38, width * 0.1, 52),
      loadingSize: clamp(12, width * 0.031, 14),
      gap: compact ? 18 : 30,
    };
  }, [width, height]);

  useEffect(() => {
    if (reducedMotion) {
      bgFade.value = 1;
      logoIn.value = 1;
      titleIn.value = 1;
      footerIn.value = 1;
      loaderIn.value = 1;
      return;
    }

    bgFade.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) });
    kenBurns.value = withTiming(1, {
      duration: durationMs + EXIT_DURATION_MS,
      easing: Easing.linear,
    });
    logoIn.value = withDelay(120, withTiming(1, { duration: 760, easing: Easing.out(Easing.cubic) }));
    titleIn.value = withDelay(300, withTiming(1, { duration: 640, easing: Easing.out(Easing.cubic) }));
    footerIn.value = withDelay(460, withTiming(1, { duration: 640, easing: Easing.out(Easing.cubic) }));
    loaderIn.value = withDelay(600, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }));
    spin.value = withRepeat(withTiming(1, { duration: 1500, easing: Easing.linear }), -1, false);
    breathe.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [
    reducedMotion,
    durationMs,
    bgFade,
    kenBurns,
    logoIn,
    titleIn,
    footerIn,
    loaderIn,
    spin,
    breathe,
  ]);

  // Hide system navigation bar on Android for immersive full-screen loading
  useEffect(() => {
    if (Platform.OS === 'android') {
      setVisibilityAsync('hidden').catch(() => {});
      SystemUI.setBackgroundColorAsync(LOADING_BG).catch(() => {});
    }
    return () => {
      if (Platform.OS === 'android') {
        setVisibilityAsync('visible').catch(() => {});
        SystemUI.setBackgroundColorAsync('transparent').catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const exitTimer = setTimeout(() => {
      exit.value = withTiming(0, { duration: EXIT_DURATION_MS, easing: Easing.in(Easing.cubic) });
      hideTimer = setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, EXIT_DURATION_MS + 50);
    }, durationMs);

    return () => {
      clearTimeout(exitTimer);
      if (hideTimer) clearTimeout(hideTimer);
      cancelAnimation(exit);
    };
  }, [durationMs, exit]);

  const handleLayout = useCallback(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  const bgStyle = useAnimatedStyle(() => ({
    opacity: bgFade.value,
    transform: [{ scale: 1 + kenBurns.value * 0.06 }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoIn.value,
    transform: [
      { translateY: interpolate(logoIn.value, [0, 1], [22, 0]) },
      { scale: interpolate(logoIn.value, [0, 1], [0.94, 1]) },
    ],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleIn.value,
    transform: [{ translateY: interpolate(titleIn.value, [0, 1], [14, 0]) }],
  }));

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerIn.value,
    transform: [{ translateY: interpolate(footerIn.value, [0, 1], [14, 0]) }],
  }));

  const loaderStyle = useAnimatedStyle(() => ({
    opacity: loaderIn.value,
  }));

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));

  const breatheStyle = useAnimatedStyle(() => ({
    opacity: interpolate(breathe.value, [0, 1], [0.72, 1]),
  }));

  const exitStyle = useAnimatedStyle(() => ({
    opacity: exit.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View
      accessibilityLabel="Aqua Alert is loading recent updates"
      accessibilityRole="progressbar"
      onLayout={handleLayout}
      style={[styles.root, exitStyle]}>
      {Platform.OS === 'android' && <NavigationBar hidden style="dark" />}
      <StatusBar style="light" />

      <Animated.View style={[StyleSheet.absoluteFill, bgStyle]}>
        <Image
          source={require('@/assets/loadingpagebg.png')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition="bottom"
          transition={0}
        />
        <View style={styles.tint} />
      </Animated.View>

      <View
        style={[
          styles.stage,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 12 },
        ]}>
        <View style={styles.spacerTop} />

        <Animated.View style={logoStyle}>
          <Image
            source={require('@/assets/images/aqua-logo.png')}
            style={{ width: metrics.logoSize, height: metrics.logoSize }}
            contentFit="contain"
            transition={0}
            cachePolicy="memory"
          />
        </Animated.View>

        <Animated.View style={[styles.titleBlock, titleStyle]}>
          <Text
            style={[
              styles.title,
              {
                fontSize: metrics.titleSize,
                lineHeight: metrics.titleSize * 1.06,
                letterSpacing: -metrics.titleSize * 0.035,
              },
            ]}>
            Aqua <Text style={styles.titleAccent}>Alert</Text>
          </Text>
          <Text
            style={[
              styles.tagline,
              {
                fontSize: metrics.taglineSize,
                letterSpacing: metrics.taglineSize * 0.18,
                marginTop: metrics.taglineSize * 0.6,
              },
            ]}>
            Detect · Warn · Protect
          </Text>
        </Animated.View>

        <View style={styles.spacerMid} />

        <Animated.View style={[styles.loader, { marginTop: metrics.gap }, loaderStyle]}>
          <Animated.View
            style={[
              styles.spinner,
              { width: metrics.ringSize, height: metrics.ringSize },
              spinStyle,
            ]}>
            <View style={[styles.ringTrack, { borderRadius: metrics.ringSize / 2 }]} />
            <View style={[styles.ringArc, { borderRadius: metrics.ringSize / 2 }]} />
          </Animated.View>
          <Animated.Text
            style={[
              styles.loadingText,
              { fontSize: metrics.loadingSize },
              breatheStyle,
            ]}>
            Loading recent updates...
          </Animated.Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    backgroundColor: LOADING_BG,
    zIndex: 9999,
    overflow: 'hidden',
  },
  tint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(4, 12, 24, 0.22)',
  },
  stage: {
    flex: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  spacerTop: {
    flex: 1.1,
  },
  spacerMid: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // Dark backdrop eliminates anti-aliased edge halo on the PNG logo
    backgroundColor: LOADING_BG,
    overflow: 'hidden',
  },
  titleBlock: {
    alignItems: 'center',
    marginTop: 14,
    alignSelf: 'stretch',
  },
  title: {
    color: DarkThemeColors.textPrimary,
    fontWeight: '800',
    textAlign: 'center',
  },
  titleAccent: {
    color: BrandColors.primaryLight,
  },
  tagline: {
    color: 'rgba(203, 213, 225, 0.88)',
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  motto: {
    color: 'rgba(248, 250, 252, 0.92)',
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: 'center',
  },
  rule: {
    width: 46,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(125, 211, 252, 0.45)',
  },
  loader: {
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringTrack: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1.5,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  ringArc: {
    ...StyleSheet.absoluteFill,
    borderWidth: 2.5,
    borderColor: 'transparent',
    borderTopColor: BrandColors.primaryLight,
    borderRightColor: BrandColors.primary,
    borderLeftColor: BrandColors.primary,
  },
  loadingText: {
    color: DarkThemeColors.textMuted,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});
