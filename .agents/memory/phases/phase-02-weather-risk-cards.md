# Phase 2: Primary Telemetry (Weather Card & Risk Metrics Row)

**Master Plan:** .agents/memory/plans/main-plan.md  
**Status:** PENDING  

---

## Selected Skills for This Phase
- `frontend/frontend-baseline`: Anti-slop quality gate and fluid responsive sizing.
- `frontend/design-engineering`: Glassmorphic card styling, precision borders, and micro-hierarchy.
- `frontend/svg-icon-craftsman`: Clean 24x24 vector weather icons (thermometer, cloud-rain, alert-triangle).

---

## Input Dependencies
- Phase 1 background and layout scaffolding.
- `src/theme/darkTheme.ts`, `src/theme/severityColors.ts`.

---

## Step-by-Step Execution
1. **Current Weather Card (`CurrentWeatherCard`):**
   - Translucent glass container (`backgroundColor: 'rgba(17, 31, 48, 0.78)'`, `borderColor: 'rgba(56, 189, 248, 0.22)'`, `borderWidth: 1`, `borderRadius: 18`).
   - Top row: Weather condition headline ("Severe Tropical Storm" / "Heavy Rain") + vector storm/cloud icon.
   - Core display: Large temperature readout (e.g. "28°" / "82°") in bold font (weight 700/800, color `#F8FAFC`).
   - Secondary detail: "Feels like 32°" or wind/humidity micro-metric in `#94A3B8`.
2. **Risk Metrics Row (`RiskMetricsRow`):**
   - Two equal or balanced horizontal sibling cards with equal gap (12-14px).
   - **Card A: Rain Probability Card (`RainProbabilityCard`):**
     * Label: "Rain Probability" in `#CBD5E1`.
     * Value: "92%" in bold `#F8FAFC`.
     * Progress Track: Cyan liquid progress indicator (`#0EA5E9` fill on `#1C2D42` track).
     * Subtext: "Heavy precipitation expected" or rate metric.
   - **Card B: Flood Risk Card (`FloodRiskCard`):**
     * Label: "Flood Risk" with warning vector icon.
     * Value: "High Risk" / "Critical Watch" in amber/orange `#F97316`.
     * Progress Track: Orange progress indicator (`#F97316` matching `SeverityColors.warning`).
     * Subtext: "Storm surge advisory".

---

## Success & Verification Criteria
- [ ] Card surfaces match loading screen transparency, subtle blur, and cyan border sheen.
- [ ] Rain progress bar is vivid cyan (`#0EA5E9`).
- [ ] Flood risk indicator is warning orange (`#F97316`).
- [ ] Zero emoji usage — all icons are clean SVG / vector glyphs.
- [ ] Cards flex cleanly without breaking on 320px screens.
