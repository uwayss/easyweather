import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";

import { LocationResult } from "../../api/location";
import Text from "../../components/Common/Text";
import Icon from "../../components/Icon";

function getLocationName(location: LocationResult): string {
  const { address } = location;
  return (
    address.city ||
    address.town ||
    address.village ||
    address.state ||
    address.country
  );
}

function LocationItem({
  result,
  onPress,
}: {
  result: LocationResult;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View className="p-2 flex-row items-center bg-light-surface dark:bg-dark-surface border-b border-light-outline/20 dark:border-dark-outline/20">
        <View className="mr-4">
          <Icon name="map-pin" size={18} type="feather" />
        </View>
        <View className="flex-1">
          <Text className="font-medium">{getLocationName(result)}</Text>
          <Text className="mt-0.5 text-xs opacity-70 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
            {result.display_name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function ResultsList({
  results,
  onSelectLocation,
}: {
  results: LocationResult[];
  onSelectLocation: (location: LocationResult) => void;
}) {
  return (
    <ScrollView
      className="absolute top-0 w-full rounded-b-lg overflow-hidden z-50 bg-light-surface dark:bg-dark-surface shadow-md"
      keyboardShouldPersistTaps="handled"
    >
      {results.slice(0, 3).map((result, index) => (
        <LocationItem
          key={index}
          result={result}
          onPress={() => onSelectLocation(result)}
        />
      ))}
    </ScrollView>
  );
}

function NoResults() {
  const { t } = useTranslation();
  return (
    <View className="absolute top-0 w-full rounded-b-lg overflow-hidden z-50 bg-light-surface dark:bg-dark-surface shadow-md">
      <View className="p-4 flex-row items-center justify-center">
        <Icon
          name="alert-circle-outline"
          size={20}
          className="mr-2 opacity-60"
        />
        <Text className="opacity-60">{t("location.no_results")}</Text>
      </View>
    </View>
  );
}

export default function LocationSearchResults({
  results,
  onSelectLocation,
  visible,
  isLoading,
}: {
  results: LocationResult[];
  onSelectLocation: (location: LocationResult) => void;
  visible: boolean;
  isLoading: boolean;
}) {
  if (!visible || isLoading) {
    return null;
  }

  if (results.length > 0) {
    return (
      <ResultsList results={results} onSelectLocation={onSelectLocation} />
    );
  }

  return <NoResults />;
}
