# Phase 4: Bottom Navigation Bar & Tab Routing

**Master Plan:** .agents/memory/plans/main-plan.md  
**Status:** PENDING  

---

## Selected Skills for This Phase
- `frontend/frontend-baseline`: Phone navigation baseline and bottom thumb-zone ergonomics.
- `frontend/phone-layout-master`: Safe area inset padding (`insets.bottom`), 44px touch targets.
- `frontend/svg-icon-craftsman`: 5 clean, grid-snapped navigation icons (Home, Map, Alerts, Analytics, Settings).

---

## Input Dependencies
- `react-native-safe-area-context` (`useSafeAreaInsets`).
- App structure in `src/app/_layout.tsx` or `src/components/app-tabs.tsx`.

---

## Step-by-Step Execution
1. **Navigation Bar Component (`DashboardNavBar`):**
   - Fixed position at bottom of the screen with glassmorphic backdrop (`backgroundColor: 'rgba(8, 19, 33, 0.94)'`, top border `rgba(56, 189, 248, 0.22)`).
   - Dynamic safe-area padding: `paddingBottom: insets.bottom > 0 ? insets.bottom : 12`, `paddingTop: 10`.
2. **Five Navigation Items:**
   - **Home:** Active state with bright cyan `#0EA5E9`, subtle glowing indicator line or pill above/below icon.
   - **Map:** Inactive state in muted blue-grey `#94A3B8`.
   - **Alerts:** Inactive state in `#94A3B8` (optional subtle alert dot).
   - **Analytics:** Inactive state in `#94A3B8`.
   - **Settings:** Inactive state in `#94A3B8`.
3. **Ergonomics & Alignment:**
   - Minimum 44x44px touch target area for each tab item.
   - Vector icons scaled to 22-24px.
   - Micro label in font size 11px, weight 600, center-aligned.
   - Press feedback with subtle opacity damping.

---

## Success & Verification Criteria
- [ ] Exactly 5 navigation items: Home, Map, Alerts, Analytics, Settings.
- [ ] Active tab is bright cyan; inactive tabs are muted blue-grey.
- [ ] Subtle active indicator visible.
- [ ] Safe-area bottom padding prevents overlap with home indicator on modern iOS/Android phones.
- [ ] Zero emojis used.
