// FILE: src/hooks/useAqiGauge.ts
import { useMemo } from "react";

export const useAqiGauge = (aqiValue?: number) => {
  const validAqiValue = useMemo(() => {
    return aqiValue !== undefined && aqiValue !== null && !isNaN(aqiValue)
      ? aqiValue
      : -1;
  }, [aqiValue]);

  return {
    validAqiValue,
  };
};