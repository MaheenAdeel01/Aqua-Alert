# Phase 1: Fix System Bugs, Token Mapping & Reusable Component System

**Status:** COMPLETED  
**Dependencies:** None  
**Category:** Frontend Architecture, Design Tokens, Core Primitives, Bug Fixes  

---

## 1. Objectives

Eliminate all visual bugs, enforce strict token adherence, create the 5 cross-screen core reusable components, and build out designed fallback states without introducing new visual effects yet.

---

## 2. Detailed Task Breakdown

### A. Token Mapping & Palette Rigor
- [x] Audit `src/theme/` (`colors.ts`, `semanticColors.ts`, `severityColors.ts`, `darkTheme.ts`, `constants/theme.ts`).
- [x] Formally map the 3-tier severity system:
  - **Calm / Informational:** `BrandColors.primaryLight` (`#38BDF8`) / `SemanticColors.information` (`#3B82F6`)
  - **Elevated / Caution:** `SeverityColors.warning` (`#F97316`) / `SemanticColors.warning` (`#F59E0B`)
  - **Critical / Emergency:** `SeverityColors.emergency` (`#DC2626`) / `SemanticColors.critical` (`#EF4444`)
- [x] Ensure any missing color gap in the 3-tier severity is cleanly aliased without creating new arbitrary palettes.

### B. Core Reusable Primitives (Single Source of Truth)
- [x] Create `src/components/ui/glass-card.tsx`:
  - Enforces existing background `rgba(17, 31, 48, 0.82)`, border `rgba(56, 189, 248, 0.22)`, radius tokens, and spacing tokens.
  - Replaces all ad-hoc card container styles across the app.
- [x] Create `src/components/ui/severity-badge.tsx`:
  - Renders colored pills for severity levels (`calm` | `elevated` | `critical`).
  - Supports "LIVE STREAM", "HIGH RISK", "EMERGENCY PROTOCOL ACTIVE".
- [x] Create `src/components/ui/stat-card.tsx`:
  - Reusable container with `icon`, `label`, `value`, `caption`, `severity`.
  - Enforces pixel-identical structure for Rain Probability & Flood Risk. Fixed-height, single-glance layout.
- [x] Create `src/components/ui/section-header.tsx`:
  - Standardized header layout with icon + title + trailing metadata.
- [x] Standardize `src/components/ui/bottom-nav.tsx` (or refactor `dashboard-nav-bar.tsx` into reusable `BottomNav`):
  - Consistent tab layout, active indicators, and notification dot colors.

### C. Bug Fixes on Reference Screen (`src/app/index.tsx`)
- [x] **Remove "Alex" Personalization:**
  - Update `src/components/dashboard/dashboard-hero.tsx` to remove `userName="Alex"`.
  - Use identity-free greeting ("Good Morning" or time-of-day + location).
- [x] **Fix Radar Card Placeholder Copy:**
  - Remove dev text `"Custom 3D Globe Visualization / Interactive layer container ready"`.
  - Replace with a polished empty state / radar target telemetry display using existing design tokens.
- [x] **Rebuild Storm Surge Safety Advisory:**
  - Wrap in `<GlassCard>`.
  - Use `<SeverityBadge level="critical" label="EMERGENCY PROTOCOL ACTIVE" />`.
  - Replace cyan styling with Critical/Emergency red tokens for icon background, badge, and borders.
- [x] **Add Hero Card Timestamp:**
  - Add "Updated 4m ago" caption to Current Conditions Hero Card using `DarkThemeColors.textMuted`.
- [x] **Icon Set Unification:**
  - Audit all icons on screen to ensure 100% adherence to single 24×24 outlined set with 2.0px stroke.
- [x] **Rebuild Rain & Flood Cards:**
  - Replace ad-hoc rows in `RiskMetricsRow` with two instances of `<StatCard>`.
- [x] **Replace Hardcoded Values:**
  - Eliminate all hardcoded hex strings, arbitrary paddings, and font sizes across components.

### D. Designed Fallback States
- [x] Create designed empty/error states using existing tokens:
  - Location permission denied state (`LocationPermissionDeniedState`).
  - Offline state indicator (`OfflineState`).
  - Failed data load retry banner/state (`FailedDataLoadState`).

---

## 3. Verification Criteria

- [x] `npx tsc --noEmit` passes with 0 errors.
- [x] `npx expo lint` passes with 0 warnings/errors.
- [x] No "Alex" text rendered anywhere.
- [x] Storm Surge Advisory shows critical red theme without hyperlink styling.
- [x] No dev placeholder copy in Radar card.
