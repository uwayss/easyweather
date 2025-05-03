// FILE: src/screens/HomeScreen/LocationSearchResults.tsx
import React from "react";
import { LocationResult } from "../../api/location";
import { ScrollView, View, Pressable } from "react-native";
import Icon from "../../components/Icon";
import { useColorScheme } from "nativewind";
import Text from "../../components/Common/Text";

function getLocationName(location: LocationResult): string {
  const { address } = location;
  return address.city || address.town || address.village || address.state || address.country;
}

function LocationItem({ result, onPress }: { result: LocationResult; onPress: () => void }) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#aaaaaa" : "#666666";

  return (
    <Pressable onPress={onPress}>
      <View className="p-2 flex-row items-center bg-light-surface dark:bg-dark-surface border-b border-light-outline/20 dark:border-dark-outline/20">
        <View className="mr-4">
          <Icon name="map-pin" size={24} color={iconColor} />
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
        <LocationItem key={index} result={result} onPress={() => onSelectLocation(result)} />
      ))}
    </ScrollView>
  );
}

export default function LocationSearchResults({
  results,
  onSelectLocation,
  visible,
}: {
  results: LocationResult[];
  onSelectLocation: (location: LocationResult) => void;
  visible: boolean;
}) {
  if (!visible || results.length === 0) return null;
  return <ResultsList results={results} onSelectLocation={onSelectLocation} />;
}
