import React from "react";
import { LocationResult } from "../api/location";
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
        <View style={styles.iconContainer}>
          <Icon source="map-marker" size={24} />
        </View>
        <View style={styles.textContainer}>
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
    <ScrollView style={styles.container}>
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
  container: {
    position: "absolute",
    top: 60,
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    zIndex: 1000,
  },
  itemSurface: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    marginTop: 2,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 4,
  },
});
