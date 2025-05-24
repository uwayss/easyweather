// FILE: src/utils/aqiUtils.ts
import { t } from "i18next";

export interface AqiLevelInfo {
  level: string; // e.g., "Good", "Moderate"
  color: string; // Hex color code
  descriptionKey: string; // Translation key for a short description
}

// Based on US EPA AQI standards
// Colors are standard AQI colors
export function getUsAqiInfo(aqiValue?: number): AqiLevelInfo {
  if (
    aqiValue === undefined ||
    aqiValue === null ||
    isNaN(aqiValue) ||
    aqiValue < 0
  ) {
    return {
      level: t("aqi.unknown"),
      color: "#9E9E9E",
      descriptionKey: "aqi.level.unknown_desc",
    }; // Grey for unknown/unavailable
  }

  if (aqiValue <= 50) {
    return {
      level: t("aqi.good"),
      color: "#00E400",
      descriptionKey: "aqi.level.good_desc",
    }; // Green
  }
  if (aqiValue <= 100) {
    return {
      level: t("aqi.moderate"),
      color: "#FFFF00",
      descriptionKey: "aqi.level.moderate_desc",
    }; // Yellow
  }
  if (aqiValue <= 150) {
    return {
      level: t("aqi.unhealthy_sensitive"),
      color: "#FF7E00",
      descriptionKey: "aqi.level.unhealthy_sensitive_desc",
    }; // Orange
  }
  if (aqiValue <= 200) {
    return {
      level: t("aqi.unhealthy"),
      color: "#FF0000",
      descriptionKey: "aqi.level.unhealthy_desc",
    }; // Red
  }
  if (aqiValue <= 300) {
    return {
      level: t("aqi.very_unhealthy"),
      color: "#8F3F97",
      descriptionKey: "aqi.level.very_unhealthy_desc",
    }; // Purple
  }
  // aqiValue > 300
  return {
    level: t("aqi.hazardous"),
    color: "#7E0023",
    descriptionKey: "aqi.level.hazardous_desc",
  }; // Maroon
}

// TODO: Implement getEuropeanAqiInfo if needed, breakpoints and levels differ.

export function formatPm25(value?: number): string {
  if (value === undefined || value === null || isNaN(value)) return "--";
  return `${Math.round(value)} µg/m³`;
}

export function formatOzone(value?: number): string {
  if (value === undefined || value === null || isNaN(value)) return "--";
  // Ozone from Open-Meteo is often in µg/m³, but sometimes discussed in ppb.
  // For simplicity, we'll display as µg/m³.
  return `${Math.round(value)} µg/m³`;
}
