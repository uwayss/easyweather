import React from "react";
import { TouchableOpacity, View } from "react-native";

import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";
import Icon from "../../../components/Icon";
import { useMainInfo } from "../../../hooks/useMainInfo";
import { CurrentWeather } from "../../../types/weather";

export function MainInfo({ current }: { current: CurrentWeather | undefined }) {
  const {
    t,
    name,
    description,
    isCurrentLocSaved,
    canBeSaved,
    handleToggleSaveLocation,
    formattedTemperatureDisplay,
    formattedFeltTempDisplay,
    starIconColor,
  } = useMainInfo(current);

  return (
    <Card elevated className="flex-1 h-48">
      <View className="p-4 w-full items-center justify-center flex-1">
        <View className="p-3 self-center w-full bg-transparent flex-row items-center justify-center">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-center text-sm max-w-[80%]"
            pop
          >
            {name}
          </Text>
          {canBeSaved && (
            <TouchableOpacity
              onPress={handleToggleSaveLocation}
              className="ml-2 p-1"
            >
              <Icon
                name={isCurrentLocSaved ? "star" : "star-outline"}
                size={20}
                color={starIconColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text className="font-bold text-5xl" pop>
          {formattedTemperatureDisplay}
        </Text>
        <Text
          className="w-full flex-wrap uppercase mt-1 tracking-widest text-center text-base font-semibold leading-relaxed"
          pop
        >
          {description || ""}
        </Text>
        <Text
          className="opacity-90 mt-2 text-base font-semibold leading-relaxed"
          pop
        >
          {t("weather.feltTemperature")}
          {": "}
          {formattedFeltTempDisplay}
        </Text>
      </View>
    </Card>
  );
}
