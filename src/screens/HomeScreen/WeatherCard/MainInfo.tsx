import React from "react";
import { View } from "react-native";
import Card from "../../../components/Common/Card";
import { useMainInfo } from "../../../hooks/useMainInfo";
import { CurrentWeather } from "../../../types/weather";
import { LocationDisplay } from "./LocationDisplay";
import { TemperatureDisplay } from "./TemperatureDisplay";

export function MainInfo({ current }: { current: CurrentWeather | undefined }) {
  const {
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
        <LocationDisplay
          name={name}
          canBeSaved={canBeSaved || undefined}
          isSaved={isCurrentLocSaved}
          onToggleSave={handleToggleSaveLocation}
          starIconColor={starIconColor}
        />
        <TemperatureDisplay
          temperature={formattedTemperatureDisplay}
          description={description}
          feltTemperature={formattedFeltTempDisplay}
        />
      </View>
    </Card>
  );
}
