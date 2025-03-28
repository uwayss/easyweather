import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { searchLocation, LocationResult } from "../../api/location";
import LocationSearchResults from "./LocationSearchResults";
import { longToast } from "../../utils/debug";
import { useLocationContext } from "../../context/LocationContext";

type DebouncedSearchFunction = (query: string) => Promise<void> | void;

function debounce(func: DebouncedSearchFunction, wait: number): DebouncedSearchFunction {
  let timeout: NodeJS.Timeout | null = null;

  return function (query: string) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(query), wait);
  };
}

export const LocationSearch = () => {
  const { updateLocation } = useLocationContext(); // Use context's update function

  const onLocationSelect = (selectedLocation: LocationResult) => {
    updateLocation({
      latitude: parseFloat(selectedLocation.lat),
      longitude: parseFloat(selectedLocation.lon),
      displayName: selectedLocation.display_name,
    });
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim()) {
        try {
          setIsLoading(true);
          const locationResults = await searchLocation(query);
          setResults(locationResults);
          setShowResults(true);
        } catch (error) {
          console.error("Error searching for location:", error);
          longToast("Error searching for location: " + error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 800),
    [],
  );

  // Handle search query changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSelectLocation = (locationResult: LocationResult) => {
    // Renamed parameter for clarity
    onLocationSelect(locationResult); // Call the function that uses context's updateLocation
    setShowResults(false);
    setSearchQuery("");
  };
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for a location"
        onChangeText={handleSearchChange}
        value={searchQuery}
        style={styles.searchbar}
        loading={isLoading} // This is search loading, separate from context loading
        keyboardType="default"
      />
      <LocationSearchResults
        results={results}
        onSelectLocation={handleSelectLocation}
        visible={showResults}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  searchbar: {
    borderRadius: 12,
  },
});
