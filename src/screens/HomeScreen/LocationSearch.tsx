import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
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
  const theme = useTheme();
  const { updateLocation } = useLocationContext();

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
          longToast("Error searching for location: " + String(error));
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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSelectLocation = (locationResult: LocationResult) => {
    onLocationSelect(locationResult);
    setShowResults(false);
    setSearchQuery("");
  };
  const { getCurrentLocation } = useLocationContext();

  const handleGeolocationPress = async () => {
    try {
      await getCurrentLocation();
      setSearchQuery("");
      setShowResults(false);
    } catch (error) {
      console.error("Geolocation error:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      zIndex: 100,
    },
    searchbar: {
      borderRadius: 12,
      backgroundColor: theme.colors.elevation.level3,
    },
    resultsContainer: {
      position: "absolute",
      top: 55,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
  });
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for a location"
        onChangeText={handleSearchChange}
        value={searchQuery}
        style={styles.searchbar}
        loading={isLoading}
        onIconPress={handleGeolocationPress}
        icon={"crosshairs-gps"}
      />
      <LocationSearchResults
        results={results}
        onSelectLocation={handleSelectLocation}
        visible={showResults}
      />
    </View>
  );
};
