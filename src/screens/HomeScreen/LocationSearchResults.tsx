// FILE: src/screens/HomeScreen/LocationSearchResults.tsx
import React from "react";
import { LocationResult } from "../../api/location";
import { ScrollView, View, Pressable, Text } from "react-native"; // Import core Text
// Removed Icon import from paper
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Import vector icon component
import { useColorScheme } from "nativewind"; // Import useColorScheme

function getLocationName(location: LocationResult): string {
  const { address } = location;
  return address.city || address.town || address.village || address.state || address.country;
}

function LocationItem({ result, onPress }: { result: LocationResult; onPress: () => void }) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#aaaaaa" : "#666666"; // Use appropriate onSurfaceVariant color

  return (
    <Pressable onPress={onPress}>
      <View className="p-2 flex-row items-center bg-light-surface dark:bg-dark-surface border-b border-light-outline/20 dark:border-dark-outline/20">
        <View className="mr-4">
          {/* Use MaterialCommunityIcons */}
          <MaterialCommunityIcons name="map-marker" size={24} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-medium text-light-onSurface dark:text-dark-onSurface">
            {getLocationName(result)}
          </Text>
          <Text className="mt-0.5 text-xs opacity-70 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
            {result.display_name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
// ... rest of the component remains the same

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
