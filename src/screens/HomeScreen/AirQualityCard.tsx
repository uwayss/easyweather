import Card from "@/src/components/Common/Card";
import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";
import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "@/src/constants/colors";
import { useWeather } from "@/src/context/WeatherContext";
import { formatOzone, formatPm25, getUsAqiInfo } from "@/src/utils/aqiUtils";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import AirQualityCardSkeleton from "./AirQualityCardSkeleton";
import AqiGauge from "./AqiGauge";

const AirQualityCard: React.FC = () => {
  const { currentAirQuality, loading: weatherLoading } = useWeather();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const iconColor =
    colorScheme === "dark"
      ? THEME_COLORS_DARK.onSurfaceVariant
      : THEME_COLORS_LIGHT.onSurfaceVariant;

  if (weatherLoading && !currentAirQuality) {
    return <AirQualityCardSkeleton />;
  }

  if (!currentAirQuality || currentAirQuality.usAqi === undefined) {
    return (
      <Card elevated className="p-4 items-center justify-center min-h-[220px]">
        <Icon name="cloud-question" size={36} className="mb-2 opacity-50" />
        <Text className="opacity-70 text-center text-xs px-2">
          {t("aqi.title")}: {t("aqi.level.unknown_desc")}
        </Text>
      </Card>
    );
  }

  const aqiInfo = getUsAqiInfo(currentAirQuality.usAqi);

  const DetailItem: React.FC<{
    labelKey: string;
    value: string;
    iconName: string;
  }> = ({ labelKey, value, iconName }) => (
    <View className="items-center flex-1 flex-row gap-4">
      <Icon name={iconName} type="material" size={26} color={iconColor} />
      <View className="items-start">
        <Text className="text-xs opacity-80 mt-1 text-center" numberOfLines={1}>
          {t(labelKey)}
        </Text>
        <Text
          className="font-semibold text-sm mt-0.5 text-center"
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <Card elevated className="p-3.5">
      <Text className="text-lg font-semibold mb-2 text-center">
        {t("aqi.title")}
      </Text>
      <AqiGauge
        aqiValue={currentAirQuality.usAqi}
        aqiInfo={aqiInfo}
        maxAqi={301}
        descriptionKey={aqiInfo.descriptionKey}
      />

      {(currentAirQuality.pm2_5 !== undefined ||
        currentAirQuality.ozone !== undefined) && (
        <>
          <View className="h-px bg-light-outline/30 dark:bg-dark-outline/30 mt-0.5 mb-2" />

          <View className="flex-row justify-around items-start">
            {currentAirQuality.pm2_5 !== undefined && (
              <DetailItem
                labelKey="aqi.pm2_5"
                value={formatPm25(currentAirQuality.pm2_5)}
                iconName="dots-hexagon"
              />
            )}
            {currentAirQuality.pm2_5 !== undefined &&
              currentAirQuality.ozone !== undefined && (
                <View className="w-px bg-light-outline/30 dark:bg-dark-outline/30 self-stretch mx-1" />
              )}
            {currentAirQuality.ozone !== undefined && (
              <DetailItem
                labelKey="aqi.ozone"
                value={formatOzone(currentAirQuality.ozone)}
                iconName="molecule"
              />
            )}
          </View>
        </>
      )}
    </Card>
  );
};

export default React.memo(AirQualityCard);
