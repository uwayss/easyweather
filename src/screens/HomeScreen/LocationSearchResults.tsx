import React from "react";
import { LocationResult } from "../../api/location";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { Surface, Text, Icon } from "react-native-paper";

function getLocationName(location: LocationResult): string {
  const { address } = location;
  return address.city || address.town || address.village || address.state || address.country;
}
function LocationItem({ result, onPress }: { result: LocationResult; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Surface style={styles.itemSurface}>
        <View className="mr-4">
          <Icon source="map-marker" size={24} />
        </View>
        <View className="flex-1">
          <Text variant="titleMedium">{getLocationName(result)}</Text>
          <Text variant="bodySmall" style={styles.description}>
            {result.display_name}
          </Text>
        </View>
      </Surface>
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
      // style={{
      //   position: "absolute",
      //   top: 60,
      //   borderRadius: 12,
      //   overflow: "hidden",
      //   width: "100%",
      //   zIndex: 1000,
      // }}
      className="absolute top-16 w-full rounded-xl overflow-hidden z-50"
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
const styles = StyleSheet.create({
  itemSurface: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  description: {
    marginTop: 2,
    opacity: 0.7,
  },
});
