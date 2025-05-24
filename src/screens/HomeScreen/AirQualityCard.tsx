// FILE: src/screens/HomeScreen/AirQualityCard.tsx
import Card from "@/src/components/Common/Card";
import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";
import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "@/src/constants/colors";
import { useWeather } from "@/src/context/WeatherContext";
import { formatOzone, formatPm25, getUsAqiInfo } from "@/src/utils/aqiUtils";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import AqiGauge from "./AqiGauge";

const AirQualityCard: React.FC = () => {
  const { currentAirQuality, loading: weatherLoading } = useWeather();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const iconColor =
    colorScheme === "dark"
      ? THEME_COLORS_DARK.onSurfaceVariant
      : THEME_COLORS_LIGHT.onSurfaceVariant;
  const indicatorColor =
    colorScheme === "dark"
      ? THEME_COLORS_DARK.primary
      : THEME_COLORS_LIGHT.primary;

  if (weatherLoading && !currentAirQuality) {
    return (
      <Card elevated className="p-4 items-center justify-center min-h-[200px]">
        <ActivityIndicator color={indicatorColor} />
      </Card>
    );
  }

  if (!currentAirQuality || currentAirQuality.usAqi === undefined) {
    return (
      <Card elevated className="p-4 items-center justify-center min-h-[200px]">
        <Icon
          name="cloud-question-outline"
          size={40}
          className="mb-2 opacity-50"
        />
        <Text className="opacity-70 text-center">
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
    <View className="items-center flex-1 px-2 py-1">
      <Icon name={iconName} type="material" size={28} color={iconColor} />
      <Text className="text-xs opacity-80 mt-1.5 text-center" numberOfLines={1}>
        {t(labelKey)}
      </Text>
      <Text
        className="font-semibold text-base mt-0.5 text-center"
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <Card elevated className="p-4">
      <Text className="text-xl font-semibold mb-3 text-center">
        {t("aqi.title")}
      </Text>

      <AqiGauge
        aqiValue={currentAirQuality.usAqi}
        aqiInfo={aqiInfo}
        maxAqi={301}
      />

      <Text
        className="text-sm opacity-80 text-center mt-2 mb-4 px-1 leading-relaxed"
        numberOfLines={3}
      >
        {t(aqiInfo.descriptionKey)}
      </Text>

      {(currentAirQuality.pm2_5 !== undefined ||
        currentAirQuality.ozone !== undefined) && (
        <>
          <View className="h-px bg-light-outline/40 dark:bg-dark-outline/40 my-2" />
          <View className="flex-row justify-around items-start pt-2">
            {currentAirQuality.pm2_5 !== undefined && (
              <DetailItem
                labelKey="aqi.pm2_5"
                value={formatPm25(currentAirQuality.pm2_5)}
                iconName="dots-hexagon"
              />
            )}
            {currentAirQuality.pm2_5 !== undefined &&
              currentAirQuality.ozone !== undefined && (
                <View className="w-px bg-light-outline/40 dark:bg-dark-outline/40 self-stretch mx-1" />
              )}
            {currentAirQuality.ozone !== undefined && (
              <DetailItem
                labelKey="aqi.ozone"
                value={formatOzone(currentAirQuality.ozone)}
                iconName="molecule-ozone"
              />
            )}
          </View>
        </>
      )}
    </Card>
  );
};

export default React.memo(AirQualityCard);
