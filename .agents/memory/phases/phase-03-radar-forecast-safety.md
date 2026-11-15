# Phase 3: Secondary Telemetry (Radar Placeholder, 4-Day Forecast & Safety Tips)

**Master Plan:** .agents/memory/plans/main-plan.md  
**Status:** PENDING  

---

## Selected Skills for This Phase
- `frontend/frontend-baseline`: Typography, spacing rhythm, and high-density visual hierarchy.
- `frontend/design-taste-frontend`: Tasteful technical dashboard aesthetic; avoiding generic placeholders.
- `frontend/ui-design-principles`: Visual balance and contrast between radar showcase and tabular forecast.

---

## Input Dependencies
- Phase 1 & 2 components.
- Theme tokens (`BrandColors`, `DarkThemeColors`).

---

## Step-by-Step Execution
1. **Live Weather Radar Placeholder (`LiveRadarPlaceholder`):**
   - Translucent card container with height 160-190px.
   - Header: "Live Weather Radar" title with a live pulse indicator (subtle glowing cyan dot) and status badge ("Telemetry Active").
   - Center area: High-tech radar sweep grid lines / concentric circles in low opacity cyan (`rgba(56, 189, 248, 0.15)`), centered compass crosshair, and placeholder label "Interactive Globe & Doppler Radar Initializing...".
   - Note: Ready for future interactive globe drop-in; no bulky external maps loaded now.
2. **Forecast Overview (`ForecastOverviewCard`):**
   - Card title: "4-Day Forecast" with calendar/clock vector icon.
   - Row or column grid displaying 4 upcoming days (e.g. Mon, Tue, Wed, Thu).
   - Each day item contains:
     * Day label ("Mon", "Tue", "Wed", "Thu") in `#CBD5E1`.
     * Vector weather condition icon (storm, heavy-rain, cloud-lightning, moderate-rain).
     * Condition descriptor ("Thunderstorm", "Heavy Rain", "Rain Showers", "Overcast").
     * High/Low temperature range (e.g. "29° / 24°", "27° / 23°").
   - Clean divider lines in `rgba(56, 189, 248, 0.12)`.
3. **Safety Tips Card (`SafetyTipsCard`):**
   - Compact advisory card with shield vector icon in `#38BDF8`.
   - Title: "Safety Advisory" or "Storm Preparedness".
   - Message: "High tide combined with storm surge may cause localized coastal flooding. Avoid low-lying coastal roads and secure outdoor equipment."
   - Actionable, authoritative senior tone with zero performative fluff.

---

## Success & Verification Criteria
- [ ] Radar placeholder has a clean, professional aesthetic without looking empty.
- [ ] 4-day forecast aligns day names, icons, and temperature ranges cleanly across all screen sizes.
- [ ] Safety tips card has high contrast, proper line-height, and shield vector icon.
- [ ] Spacing between all cards is consistent (14-16px).
