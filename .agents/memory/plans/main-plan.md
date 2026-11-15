# Master Plan: Aqua Alert Dashboard Frontend

**Date:** 2026-11-15  
**Status:** IN PROGRESS (Phase 3 of 5)  
**Total Phases:** 5  
**Category:** Frontend Architecture, Design Taste, Anti-AI SOP, Responsive Engineering  

---

## 1. Goal & Architecture

Build the production-quality Aqua Alert Dashboard frontend in React Native Expo, strictly preserving the provided storm/cyclone background asset (`assets/dashboardbg.png`) and the clean transparent logo (`assets/aqua_alert_logo_transparent_clean.png`), visually harmonized with the existing loading screen design system.

### Key Technical & Visual Constraints
- **Main Background & Storm Composition:** The main screen background must use `assets/dashboardbg.png`. The storm/cyclone situated in the upper-right area must remain clearly visible and never obscured by greeting text, cards, or status indicators.
- **Brand Consistency:** Exact dark theme alignment with `src/components/loading-screen.tsx` and `src/theme/darkTheme.ts` (Deep Navy `#081321`, Card Surfaces `rgba(17, 31, 48, 0.78)`, Cyan Accent `#0EA5E9` / `#38BDF8`, Orange Risk `#F97316`, Text `#F8FAFC`, `#CBD5E1`, `#94A3B8`).
- **Zero AI Slop:** No emojis, no uppercase tracked eyebrows, no floating blur blobs, no generic 3-card equal grids. Real environmental telemetry hierarchy.
- **Component Decomposition:** Deconstruct into modular components under `src/components/dashboard/`:
  1. `DashboardBackground`: Aspect-ratio-preserving background wrapper.
  2. `DashboardHero`: Upper-left branding + greeting & location with asymmetric breathing space protecting the upper-right cyclone.
  3. `CurrentWeatherCard`: Temperature, conditions, feels-like, and weather iconography.
  4. `RiskMetricsRow`: Dual asymmetric cards for Rain Probability (cyan bar) and Flood Risk (warning icon, orange progress indicator).
  5. `LiveRadarPlaceholder`: Sleek glassmorphic radar telemetry placeholder preparing for interactive globe integration.
  6. `ForecastOverviewCard`: 4-day atmospheric forecast with day tags, icons, and temperature ranges.
  7. `SafetyTipsCard`: High-utility compact advisory with shield icon and localized flood safety recommendations.
  8. `DashboardNavBar`: Fixed 5-tab navigation (Home, Map, Alerts, Analytics, Settings) with active cyan indicators and safe-area padding.
- **Responsiveness:** Dynamic scaling across compact (320px–375px) to standard (390px–430px) and large phone screens using `useSafeAreaInsets` and `useWindowDimensions`.

---

## 2. Phase Breakdown

- [x] **Phase 1: Foundation, Tokens, Background & Hero Section**
  - *Skills:* `frontend-baseline`, `design-taste-frontend`, `phone-layout-master`
  - *Deliverables:* Theme tokens, dashboard background framing, upper-left branding, cyclone visibility preservation, hero greeting/location.
- [x] **Phase 2: Primary Telemetry (Weather Card & Risk Metrics Row)**
  - *Skills:* `frontend-baseline`, `design-engineering`, `svg-icon-craftsman`
  - *Deliverables:* Current weather card, Rain probability card with cyan progress bar, Flood risk card with orange severity indicator.
- [ ] **Phase 3: Secondary Telemetry (Radar Placeholder, 4-Day Forecast & Safety Tips)**
  - *Skills:* `frontend-baseline`, `design-taste-frontend`, `ui-design-principles`
  - *Deliverables:* Live radar placeholder container, 4-day forecast overview component, compact safety tips card with shield vector.
- [ ] **Phase 4: Bottom Navigation Bar & Tab Routing**
  - *Skills:* `frontend-baseline`, `phone-layout-master`, `mobile-native-feel`
  - *Deliverables:* 5-item bottom navigation bar (Home, Map, Alerts, Analytics, Settings), active cyan glow, safe-area inset anchoring, zero emoji standard.
- [ ] **Phase 5: Full Integration, Responsive Scaling & Anti-Slop Audit**
  - *Skills:* `frontend-baseline`, `anti-ai-sop-agent`, `ui-stress-tester`
  - *Deliverables:* Full page assembly in `src/app/index.tsx`, testing across screen dimensions, no-clipping verification, cyclone visibility check, typecheck.

---

## 3. Global Verification Standards

1. `npx tsc --noEmit` must pass with zero TypeScript errors.
2. `npx expo lint` must pass with zero lint errors.
3. Upper-right cyclone must remain unobstructed on viewports from 320px to 480px width.
4. Navigation bar must remain pinned at bottom with correct safe-area insets.
5. All 6 core cards rendered with exact colors, transparency, borders, and typography.
6. Zero emojis present in code or UI text.
