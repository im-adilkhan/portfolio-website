/**
 * Chart tokens — dark surface ke liye selected steps (validated set).
 * Categorical order fixed hai; kabhi cycle mat karo. 6th series se aage "Other".
 */
export const SERIES = [
  "#3987e5", // 1 blue
  "#d95926", // 2 orange
  "#199e70", // 3 aqua
  "#c98500", // 4 yellow
  "#d55181", // 5 magenta
  "#9085e9", // 6 violet
] as const;

export const CHART = {
  surface: "#12100f",
  grid: "#2c2c2a",
  axis: "#383835",
  muted: "#898781",
  ink: "#ffffff",
  ink2: "#c3c2b7",
} as const;

export const tooltipStyle = {
  background: "#1a1a19",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 12,
  padding: "10px 12px",
  fontSize: 12,
  color: CHART.ink,
  boxShadow: "0 12px 40px -12px rgba(0,0,0,0.7)",
} as const;
