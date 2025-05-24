// FILE: src/utils/pollenUtils.ts
import { t } from "i18next";

export interface PollenLevelInfo {
  level: string; // e.g., "Low", "Moderate"
  color: string; // Hex color code
  descriptionKey: string; // Translation key for a short description
}

// Generic pollen thresholds - these can vary greatly by region and specific pollen type.
// This is a simplified starting point. Colors are indicative.
// Values from Open-Meteo are typically grains/m³.
export function getPollenInfo(
  pollenValue?: number,
  pollenTypeKey?: string
): PollenLevelInfo {
  if (
    pollenValue === undefined ||
    pollenValue === null ||
    isNaN(pollenValue) ||
    pollenValue < 0
  ) {
    return {
      level: t("pollen.level.unknown"),
      color: "#9E9E9E",
      descriptionKey: "pollen.level.unknown_desc",
    }; // Grey
  }

  // Example thresholds (these are illustrative and may need adjustment)
  if (pollenValue <= 15) {
    // Low for many types
    return {
      level: t("pollen.level.low"),
      color: "#A2D9A1",
      descriptionKey: "pollen.level.low_desc",
    }; // Light Green
  }
  if (pollenValue <= 50) {
    // Moderate
    return {
      level: t("pollen.level.moderate"),
      color: "#FFECB3",
      descriptionKey: "pollen.level.moderate_desc",
    }; // Light Yellow
  }
  if (pollenValue <= 200) {
    // High
    return {
      level: t("pollen.level.high"),
      color: "#FFCC80",
      descriptionKey: "pollen.level.high_desc",
    }; // Light Orange
  }
  // Very High
  return {
    level: t("pollen.level.very_high"),
    color: "#FFAB91",
    descriptionKey: "pollen.level.very_high_desc",
  }; // Light Red
}

export const pollenTypes = [
  { key: "alder_pollen", nameKey: "pollen.type.alder" },
  { key: "birch_pollen", nameKey: "pollen.type.birch" },
  { key: "grass_pollen", nameKey: "pollen.type.grass" },
  { key: "mugwort_pollen", nameKey: "pollen.type.mugwort" },
  { key: "olive_pollen", nameKey: "pollen.type.olive" },
  { key: "ragweed_pollen", nameKey: "pollen.type.ragweed" },
] as const; // `as const` helps with type inference for keys

export type PollenTypeKey = (typeof pollenTypes)[number]["key"];
