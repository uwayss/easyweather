import React from "react";
import { View } from "react-native";
import { useAqiGauge } from "@/src/hooks/useAqiGauge";
import { AqiLevelInfo } from "@/src/utils/aqiUtils";
import { GaugeBar } from "./AqiGauge/GaugeBar";
import { GaugeInfo } from "./AqiGauge/GaugeInfo";

interface AqiGaugeProps {
  aqiValue?: number;
  aqiInfo: AqiLevelInfo;
  maxAqi?: number;
}

const AqiGauge: React.FC<AqiGaugeProps> = ({ aqiValue, aqiInfo }) => {
  const { validAqiValue, displayMax, percentage, AQI_LEVELS_ORDERED } =
    useAqiGauge(aqiValue);

  return (
    <View className="items-center w-full mb-2">
      <GaugeBar
        validAqiValue={validAqiValue}
        percentage={percentage}
        aqiInfo={aqiInfo}
        AQI_LEVELS_ORDERED={AQI_LEVELS_ORDERED}
        displayMax={displayMax}
      />
      <GaugeInfo validAqiValue={validAqiValue} aqiInfo={aqiInfo} />
    </View>
  );
};

export default AqiGauge;
