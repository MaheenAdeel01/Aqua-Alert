# Phase 1: Foundation, Tokens, Background & Hero Section

**Master Plan:** .agents/memory/plans/main-plan.md  
**Status:** FINISHED ✓  

---

## Selected Skills for This Phase
- `frontend/frontend-baseline`: Mandatory baseline for typography, color contrast, and phone layout.
- `frontend/design-taste-frontend`: Exact subject-matter alignment with cyclone/storm telemetry and loading screen aesthetic.
- `frontend/phone-layout-master`: Safe-area math and asymmetric top layout ensuring the cyclone is preserved in the upper-right.

---

## Input Dependencies
- `assets/dashboardbg.png` (738x1600 storm/cyclone/ocean graphic)
- `assets/aqua_alert_logo_transparent_clean.png` (transparent high-res logo)
- `src/theme/darkTheme.ts` & `src/theme/colors.ts`

---

## Step-by-Step Execution
1. **Background Component (`DashboardBackground`):**
   - Render `assets/dashboardbg.png` full-screen using `expo-image` `Image` or `ImageBackground`.
   - Set content fit to `cover` and position anchored to top/center so the storm and lightning remain dramatic and clear.
   - Add a subtle dark scrim/overlay below the hero area so cards remain legible while preserving the storm artwork above.
2. **Hero Section (`DashboardHero`):**
   - Upper-left: Aqua Alert logo icon (width: 38-42px, height: 38-42px) alongside "Aqua Alert" brand text in weight 800 (`#F8FAFC` and accent `#7DD3FC`).
   - Below branding: Contextual greeting (e.g. "Good Morning, Alex" or "Operational Status") in font size 18-20px (`#F8FAFC`).
   - Location tag: Location pin vector icon + "Miami, Florida" in font size 14px (`#94A3B8`).
   - Upper-right: Deliberate negative space (width: 45-50% on right side) so the cyclone and lightning spiral remain 100% visible and un-obscured.
   - Spacing: Proper vertical padding between hero and first weather card.

---

## Success & Verification Criteria
- [x] `dashboardbg.png` is displayed without stretching or distortion.
- [x] Upper-right storm/cyclone is prominent and completely unobstructed.
- [x] Logo and brand typography match the loading screen style.
- [x] Hero layout adapts gracefully from 320px to 480px widths.
