import { useMemo } from "react";

const AQI_LEVELS_ORDERED = [
  { max: 50, color: "#00E400", key: "good" },
  { max: 100, color: "#FFFF00", key: "moderate" },
  { max: 150, color: "#FF7E00", key: "unhealthy_sensitive" },
  { max: 200, color: "#FF0000", key: "unhealthy" },
  { max: 300, color: "#8F3F97", key: "very_unhealthy" },
  { max: 500, color: "#7E0023", key: "hazardous" },
];

export const useAqiGauge = (aqiValue?: number) => {
  const { validAqiValue, displayMax, percentage } = useMemo(() => {
    const val =
      aqiValue !== undefined && aqiValue !== null && !isNaN(aqiValue)
        ? aqiValue
        : -1;
    const max = AQI_LEVELS_ORDERED[AQI_LEVELS_ORDERED.length - 1].max;
    const clamped = Math.min(val, max);
    const perc = val >= 0 ? (clamped / max) * 100 : 0;
    return { validAqiValue: val, displayMax: max, percentage: perc };
  }, [aqiValue]);

  return {
    validAqiValue,
    displayMax,
    percentage,
    AQI_LEVELS_ORDERED,
  };
};
