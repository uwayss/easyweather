// FILE: src/screens/HomeScreen/AirQualityCard.tsx
import Card from "@/src/components/Common/Card";
import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";
import { useAirQualityCard } from "@/src/hooks/useAirQualityCard";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import AirQualityCardSkeleton from "./AirQualityCardSkeleton";
import { AirQualityDetailItem } from "./AirQualityDetailItem";
import AqiGauge from "./AqiGauge";

const AqiUnavailable = () => {
  const { t } = useTranslation();
  return (
    <Card elevated className="p-4 items-center justify-center min-h-[220px]">
      <Icon name="cloud-question" size={36} className="mb-2 opacity-50" />
      <Text className="opacity-70 text-center text-xs px-2">
        {t("aqi.title")}: {t("aqi.level.unknown_desc")}
      </Text>
    </Card>
  );
};

const AirQualityCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    weatherLoading,
    currentAirQuality,
    iconColor,
    aqiInfo,
    formattedPm25Value,
    formattedOzoneValue,
  } = useAirQualityCard();

  if (weatherLoading && !currentAirQuality) {
    return <AirQualityCardSkeleton />;
  }

  if (!currentAirQuality || currentAirQuality.usAqi === undefined) {
    return <AqiUnavailable />;
  }

  return (
    <Card elevated className="p-3.5">
      <Text className="text-lg font-semibold mb-2 text-center">
        {t("aqi.title")}
      </Text>
      <AqiGauge aqiValue={currentAirQuality.usAqi} aqiInfo={aqiInfo} />
      {(currentAirQuality.pm2_5 !== undefined ||
        currentAirQuality.ozone !== undefined) && (
        <>
          <View className="h-px bg-light-outline/30 dark:bg-dark-outline/30 mt-0.5 mb-2" />
          <View className="flex-row justify-around items-start">
            {currentAirQuality.pm2_5 !== undefined && (
              <AirQualityDetailItem
                labelKey="aqi.pm2_5"
                value={formattedPm25Value}
                iconName="dots-hexagon"
                iconColor={iconColor}
              />
            )}
            {currentAirQuality.pm2_5 !== undefined &&
              currentAirQuality.ozone !== undefined && (
                <View className="w-px bg-light-outline/30 dark:bg-dark-outline/30 self-stretch mx-1" />
              )}
            {currentAirQuality.ozone !== undefined && (
              <AirQualityDetailItem
                labelKey="aqi.ozone"
                value={formattedOzoneValue}
                iconName="molecule"
                iconColor={iconColor}
              />
            )}
          </View>
        </>
      )}
    </Card>
  );
};

export default React.memo(AirQualityCard);
