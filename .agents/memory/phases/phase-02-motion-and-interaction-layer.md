# Phase 2: Motion, Feedback & Targeted Interaction Layer

**Status:** PENDING APPROVAL  
**Dependencies:** Phase 1  
**Category:** React Native Reanimated, Micro-interactions, Gestures, Performance  

---

## 1. Objectives

Implement purposeful, physics-based 60fps animations and micro-interactions using `react-native-reanimated` without causing layout shifts or jank. Enforce strict boundaries so expand/collapse is applied ONLY to the 3 permitted components.

---

## 2. Detailed Task Breakdown

### A. Entrance & Telemetry Animations
- [ ] **Staggered Entrance Animation:**
  - Choreograph sequential fade/slide-up entrance (60–100ms stagger) on screen load across hero, conditions card, stat cards, radar, forecast, and advisory.
- [ ] **Animated Numeric Count-Up:**
  - Animate percentages (Rain 92%, Flood 82%) and big temperature figures (28°) on initial load and pull-to-refresh.
- [ ] **Live Pulse Animation:**
  - Apply glowing pulse animation to the "LIVE STREAM" badge on the radar card and active status dots using mapped severity color tokens.

### B. Gestures, Transitions & Feedback
- [ ] **Scroll-Aware Sticky Header:**
  - Use Reanimated scroll offset to interpolate hero section into a slim sticky top bar (Location pin + mini temperature) when scrolled past the hero threshold.
- [ ] **On-Brand Pull-To-Refresh:**
  - Implement custom pull-to-refresh spinner with droplet or radar-sweep motif constructed from existing brand tokens (`BrandColors.primaryLight`).
- [ ] **Tactile Press Feedback:**
  - Add micro-scale (0.985x) and opacity shift on press for all cards, buttons, and bottom nav tabs.
- [ ] **Bottom Nav Transitions:**
  - Soft fade/slide indicator transitions between bottom navigation items.
- [ ] **Skeleton & Shimmer Loading States:**
  - Build shimmer placeholders for hero card, radar container, and forecast rows using surface tokens.

### C. Targeted Expand/Collapse Interactions (STRICT SCOPE)
- [ ] **4-Day Forecast Row Inline Expansion:**
  - Tap any forecast day to smoothly expand inline accordion revealing hourly breakdown (temp, precipitation, wind).
- [ ] **Radar Card Fullscreen Expand:**
  - Tap radar card to smoothly expand into full-screen interactive view; collapsed view maintains compact dashboard height.
- [ ] **Storm Surge Advisory Text Expand:**
  - If advisory text exceeds 2–3 lines, clamp with a smooth "Read more / Read less" toggle.
- [ ] **Strict Constraint Verification:**
  - Verify that `<StatCard>` (Rain Probability and Flood Risk) has ZERO expand/collapse behavior and remains a fixed-height single-glance card.

---

## 3. Verification Criteria

- [ ] Reanimated worklets execute cleanly on UI thread with zero frame drops.
- [ ] Scroll performance remains at 60fps on both iOS and Android.
- [ ] Rain Probability and Flood Risk cards remain strictly fixed-height.
- [ ] `npx tsc --noEmit` and `npx expo lint` pass.
