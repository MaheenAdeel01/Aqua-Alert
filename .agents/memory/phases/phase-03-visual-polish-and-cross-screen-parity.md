# Phase 3: Visual Polish, Typography & Cross-Screen Parity

**Status:** COMPLETED  
**Dependencies:** Phase 1, Phase 2  
**Category:** Visual Polish, Typography, Cross-Screen Unification, Accessibility  

---

## 1. Objectives

Eliminate any remaining visual drift across all app tabs (Map, Alerts, Analytics, Settings), polish ambient background aesthetics, refine typographic hierarchy, and conduct an accessibility audit.

---

## 2. Detailed Task Breakdown

### A. Surface Uniformity & Visual Harmony
- [x] **Glass Surface Parity:**
  - Verify every card across the app consumes `<GlassCard>` with identical blur, border opacity, and corner radii.
- [x] **Ambient Storm Motion / Negative Space:**
  - Upgrade static storm background with subtle, performance-safe GPU ambient drift (slow rotation and breathing scale) in `DashboardBackground`, respecting `useReducedMotion()`.

### B. Typographic Refinement
- [x] **Hero Temperature Display:**
  - Apply distinct tabular/display numeral styling with negative tracking (-2px) and balanced optical weight.
- [x] **Label Consistency:**
  - Standardize letter-spacing (0.4px–0.8px) on all uppercase telemetry labels (WIND, HUMIDITY, PRESSURE, RANGE).

### C. Cross-Screen Parity (Tabs Unification)
- [x] **Extend Components to Other Tabs:**
  - Built `MapScreen` (`src/components/screens/map-screen.tsx`) using `<GlassCard>`, `<SectionHeader>`, and `<SeverityBadge>`.
  - Built `AlertsScreen` (`src/components/screens/alerts-screen.tsx`) with real emergency warnings and severity tier filters.
  - Built `AnalyticsScreen` (`src/components/screens/analytics-screen.tsx`) with `<StatCard>` metrics and barometric sparklines.
  - Built `SettingsScreen` (`src/components/screens/settings-screen.tsx`) with unit switches, audio siren toggles, and cache controls.
  - Unified all 5 tabs inside `src/app/index.tsx` via `<BottomNav>` with persistent layout parity.

### D. Accessibility & Ergonomics Pass
- [x] **Contrast Auditing:**
  - Verify WCAG AA contrast for all text against existing dark surfaces (`#081321`, `#111F30`).
- [x] **Touch Target Bounds:**
  - Verify minimum 44×44px touch targets on all interactive controls, filter pills, and nav items.
- [x] **Screen Reader Labels:**
  - Add explicit `accessibilityLabel` and `accessibilityRole` on all icon-only buttons, modal triggers, and badges.

### E. Optional Enhancements (Lower Priority)
- [x] Unit toggle switch (°C vs °F, km/h vs mph) built into Settings.
- [x] Data attribution to NOAA NHC / NWS Miami Doppler WSR-88D.

---

## 3. Verification Criteria

- [x] All 5 navigation tabs visually aligned with identical tokens and primitives.
- [x] 100% WCAG AA contrast compliance on dark theme tokens.
- [x] `npx tsc --noEmit` and `npx expo lint` pass with 0 errors.
