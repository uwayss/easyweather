import { Image as ExpoImage } from "expo-image";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";
import { useForecastItem } from "../../../hooks/useForecastItem";
import { DayWeather } from "../../../types/weather";

interface ForecastItemProps {
  item: DayWeather;
  index: number;
}

const ForecastItem = React.memo(function ForecastItem({
  item,
  index,
}: ForecastItemProps) {
  const {
    dayName,
    weatherDescription,
    formattedMaxTemp,
    formattedMinTemp,
    handlePress,
  } = useForecastItem(item, index);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
      <Card
        elevated
        className={`mr-4 items-center justify-between p-3 gap-1.5 w-36 h-48`}
      >
        <Text numberOfLines={1} className="w-full text-center font-semibold">
          {dayName}
        </Text>
        {!item.empty && weatherDescription ? (
          <ExpoImage
            source={weatherDescription.image}
            style={{ height: 64, width: 64 }}
            contentFit="contain"
          />
        ) : (
          <Card className="size-16" borderType="hidden" />
        )}
        <Text
          numberOfLines={1}
          className="text-center text-xs text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant"
        >
          {!item.empty ? weatherDescription?.description || "" : ""}
        </Text>
        {!item.empty ? (
          <View className="flex-row gap-2 items-center">
            <Text className="text-lg font-bold">{formattedMaxTemp}</Text>
            <Text className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              {formattedMinTemp}
            </Text>
          </View>
        ) : (
          <View style={{ height: 20 }} />
        )}
      </Card>
    </TouchableOpacity>
  );
});

export default ForecastItem;
