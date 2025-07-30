// FILE: src/screens/HomeScreen/AqiGauge.tsx
import React from "react";
import { View } from "react-native";
import { useAqiGauge } from "@/src/hooks/useAqiGauge";
import { AqiLevelInfo } from "@/src/utils/aqiUtils";
import { GaugeInfo } from "./AqiGauge/GaugeInfo";

interface AqiGaugeProps {
  aqiValue?: number;
  aqiInfo: AqiLevelInfo;
}

const AqiGauge: React.FC<AqiGaugeProps> = ({ aqiValue, aqiInfo }) => {
  const { validAqiValue } = useAqiGauge(aqiValue);

  return (
    <View className="items-center w-full mb-2">
      <GaugeInfo validAqiValue={validAqiValue} aqiInfo={aqiInfo} />
    </View>
  );
};

export default AqiGauge;
