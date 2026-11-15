# Phase 3: Visual Polish, Typography & Cross-Screen Parity

**Status:** PENDING APPROVAL  
**Dependencies:** Phase 1, Phase 2  
**Category:** Visual Polish, Typography, Cross-Screen Unification, Accessibility  

---

## 1. Objectives

Eliminate any remaining visual drift across all app tabs (Map, Alerts, Analytics, Settings), polish ambient background aesthetics, refine typographic hierarchy, and conduct an accessibility audit.

---

## 2. Detailed Task Breakdown

### A. Surface Uniformity & Visual Harmony
- [ ] **Glass Surface Parity:**
  - Verify every card across the app consumes `<GlassCard>` with identical blur, border opacity, and corner radii.
- [ ] **Ambient Storm Motion / Negative Space:**
  - Upgrade static storm background with subtle, performance-safe GPU ambient drift (slow rotation or gentle atmospheric breathing) or calibrate negative space so the cyclone remains crisp and unobscured.

### B. Typographic Refinement
- [ ] **Hero Temperature Display:**
  - Apply distinct tabular/display numeral styling with negative tracking (-2px) and balanced optical weight.
- [ ] **Label Consistency:**
  - Standardize letter-spacing (0.4px–0.8px) on all uppercase telemetry labels (WIND, HUMIDITY, PRESSURE, RANGE).

### C. Cross-Screen Parity (Tabs Unification)
- [ ] **Extend Components to Other Tabs:**
  - Unify Map screen (`src/app/explore.tsx` or dedicated Map route) with the same token set, `<GlassCard>`, and `<SectionHeader>`.
  - Establish token and component parity for Alerts, Analytics, and Settings screens so all 5 tabs share the same design language and `<BottomNav>`.

### D. Accessibility & Ergonomics Pass
- [ ] **Contrast Auditing:**
  - Verify WCAG AA contrast for all text against existing dark surfaces (`#081321`, `#111F30`).
- [ ] **Touch Target Bounds:**
  - Verify minimum 44×44px touch targets on all interactive controls and nav items.
- [ ] **Screen Reader Labels:**
  - Add explicit `accessibilityLabel` and `accessibilityRole` on all icon-only buttons and badges.

### E. Optional Enhancements (Lower Priority)
- [ ] Unit toggle switch (°C vs °F, km/h vs mph).
- [ ] Light theme token parity verification in `src/theme/lightTheme.ts`.

---

## 3. Verification Criteria

- [ ] All 5 navigation tabs visually aligned with identical tokens and primitives.
- [ ] 100% WCAG AA contrast compliance on dark theme tokens.
- [ ] `npx tsc --noEmit` and `npx expo lint` pass with 0 errors.
