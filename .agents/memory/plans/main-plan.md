# Master Plan: Aqua Alert UI Polishing & Design System Overhaul

**Date:** 2026-11-15  
**Status:** READY TO IMPLEMENT (Phase 1 Pending Approval)  
**Total Phases:** 3  
**Category:** Frontend Architecture, Design System, Motion & Interaction, Visual Polish  
**Reference Screen:** Home Dashboard (`src/app/index.tsx`)  
**Scope Boundary:** Front-end UI, layout, styling, icons, and animation ONLY. No changes to backend logic, data fetching, APIs, permission-request logic, or no-login/no-auth flow.

---

## 1. System Architecture & Token Mapping

### Existing Token Authority
Tokens defined in `src/theme/` and `src/constants/theme.ts`:
- **Backgrounds & Surfaces:**
  - `NeutralColors.background` (`#081321`) / `DarkThemeColors.background`
  - `NeutralColors.surface` (`#111F30`) / `DarkThemeColors.surface`
  - `NeutralColors.surfaceVariant` (`#1C2D42`)
  - `NeutralColors.surfaceElevated` (`#243950`)
  - Glass Surface: `rgba(17, 31, 48, 0.82)` with border `rgba(56, 189, 248, 0.22)`
- **Typography & Text Tokens:**
  - `NeutralColors.textPrimary` (`#F8FAFC`) / `DarkThemeColors.textPrimary`
  - `NeutralColors.textSecondary` (`#CBD5E1`) / `DarkThemeColors.textSecondary`
  - `NeutralColors.textMuted` (`#94A3B8`) / `DarkThemeColors.textMuted`
  - `NeutralColors.textDisabled` (`#64748B`)
- **Three-Tier Severity System:**
  - **Calm / Informational:** `BrandColors.primaryLight` (`#7DD3FC` / `#38BDF8`) & `SemanticColors.information` (`#3B82F6`)
  - **Elevated / Caution:** `SeverityColors.warning` (`#F97316`) & `SemanticColors.warning` (`#F59E0B`)
  - **Critical / Emergency:** `SeverityColors.emergency` (`#DC2626`) & `SemanticColors.critical` (`#EF4444`)
- **Spacing & Radius Tokens (`src/constants/theme.ts`):**
  - Spacing: `half` (2px), `one` (4px), `two` (8px), `three` (16px), `four` (24px), `five` (32px), `six` (64px)
  - Card Radius: Standardized fluid clamp (16px to 20px) matching token scale
- **Unified Outlined Icons:**
  - Single outlined 24×24 icon library with uniform 2.0px stroke (`assets/icons/*.svg` via `src/components/dashboard/icon.tsx`). Zero mixed styles or filled glyphs.

---

## 2. Shared Core Components

To guarantee zero visual drift between Home, Map, Alerts, Analytics, and Settings:
1. `<GlassCard>`: Base glassmorphic surface wrapping existing background, border, blur tokens, radius token, and padding.
2. `<StatCard icon label value caption severity>`: Pixel-identical layout for Rain Probability and Flood Risk, differing only in content and severity tier. Fixed height, strictly NO expand/collapse.
3. `<SectionHeader icon title trailing?>`: Standardized layout for section icons, titles, and trailing metadata tags.
4. `<SeverityBadge level label>`: Colored pill status indicator strictly mapped to Calm, Elevated, or Critical tokens. Fixes the safety advisory bug.
5. `<BottomNav>`: Unified 5-item navigation bar across all screens with active glow indicators and notification badge support.

---

## 3. Phase Roadmap

- [x] **Phase 1: Fix System Bugs, Token Mapping & Reusable Component System**
  - *Files:* `src/theme/`, `src/components/ui/`, `src/components/dashboard/`, `src/app/index.tsx`
  - *Focus:* Bug fixes (remove Alex personalization, fix radar placeholder dev copy, fix advisory severity colors), build 5 reusable components, icon audit, token enforcement, fallback states (offline, location denied, load failed).
- [ ] **Phase 2: Motion, Feedback & Targeted Interaction Layer**
  - *Files:* `src/components/dashboard/`, `src/components/ui/`, `src/app/index.tsx`
  - *Focus:* Staggered entrance, scroll-condensing sticky header, live badge pulse, animated number count-ups, custom pull-to-refresh spinner, shimmer skeletons, tap feedback, tab transitions, targeted inline expand/collapse (Forecast, Radar, Safety Advisory ONLY).
- [ ] **Phase 3: Visual Polish, Typography & Cross-Screen Parity**
  - *Files:* `src/theme/`, `src/components/`, `src/app/`
  - *Focus:* `<GlassCard>` parity check across all tabs, subtle ambient storm background motion, display numeral typography, parity implementation across Map/Alerts/Analytics/Settings, accessibility & touch targets.

---

## 4. Verification Protocol

- Typecheck: `npx tsc --noEmit`
- Linter: `npx expo lint`
- Zero hardcoded hex colors outside token files.
- Zero AI slop: no emojis, no uppercase tracked eyebrows, no floating blur blobs.
