import { t } from "i18next";

export interface AqiLevelInfo {
  level: string;
  color: string;
  descriptionKey: string;
}

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
    };
  }
  if (aqiValue <= 50) {
    return {
      level: t("aqi.good"),
      color: "#00E400",
      descriptionKey: "aqi.level.good_desc",
    };
  }
  if (aqiValue <= 100) {
    return {
      level: t("aqi.moderate"),
      color: "#FFFF00",
      descriptionKey: "aqi.level.moderate_desc",
    };
  }
  if (aqiValue <= 150) {
    return {
      level: t("aqi.unhealthy_sensitive"),
      color: "#FF7E00",
      descriptionKey: "aqi.level.unhealthy_sensitive_desc",
    };
  }
  if (aqiValue <= 200) {
    return {
      level: t("aqi.unhealthy"),
      color: "#FF0000",
      descriptionKey: "aqi.level.unhealthy_desc",
    };
  }
  if (aqiValue <= 300) {
    return {
      level: t("aqi.very_unhealthy"),
      color: "#8F3F97",
      descriptionKey: "aqi.level.very_unhealthy_desc",
    };
  }
  return {
    level: t("aqi.hazardous"),
    color: "#7E0023",
    descriptionKey: "aqi.level.hazardous_desc",
  };
}

export function getUvIndexInfo(uvIndexValue?: number) {
  if (
    uvIndexValue === undefined ||
    uvIndexValue === null ||
    isNaN(uvIndexValue) ||
    uvIndexValue < 0
  ) {
    return {
      text: t("uv_index.low"),
      color: "#90be6d",
      valueText: "--",
    };
  }

  const roundedUvIndex = Math.round(uvIndexValue);
  let text = t("uv_index.low");
  let color = "#90be6d";

  if (roundedUvIndex >= 11) {
    text = t("uv_index.extreme");
    color = "#BA68C8";
  } else if (roundedUvIndex >= 8) {
    text = t("uv_index.very_high");
    color = "#f94144";
  } else if (roundedUvIndex >= 6) {
    text = t("uv_index.high");
    color = "#f8961e";
  } else if (roundedUvIndex >= 3) {
    text = t("uv_index.moderate");
    color = "#f9c74f";
  }

  return { text, color, valueText: roundedUvIndex.toString() };
}

export function formatPm25(value?: number): string {
  if (value === undefined || value === null || isNaN(value)) return "--";
  return `${Math.round(value)} µg/m³`;
}

export function formatOzone(value?: number): string {
  if (value === undefined || value === null || isNaN(value)) return "--";
  return `${Math.round(value)} µg/m³`;
}
