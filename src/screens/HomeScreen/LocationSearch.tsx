// FILE: src\screens\HomeScreen\LocationSearch.tsx
import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import { searchLocation, LocationResult } from "../../api/location";
import LocationSearchResults from "./LocationSearchResults";
import { useLocationContext } from "../../context/LocationContext";
import { useTranslation } from "react-i18next";
import { getAnalytics } from "@react-native-firebase/analytics";

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
  const { updateLocation, getCurrentLocation, setError } = useLocationContext();
  const { t } = useTranslation();

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
          getAnalytics().logEvent("search_location_success", { query_length: query.length });
        } catch (error) {
          const msg = `Error searching location: ${String(error)}`;
          setError(msg);
          getAnalytics().logEvent("search_location_failed", { query: query, error: String(error) });
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 500),
    [setError],
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSelectLocation = (locationResult: LocationResult) => {
    getAnalytics().logEvent("select_location_result", {
      selected_display_name: locationResult.display_name,
    });

    onLocationSelect(locationResult);
    setShowResults(false);
    setSearchQuery("");
  };

  const handleGeolocationPress = async () => {
    try {
      await getCurrentLocation();
      setSearchQuery("");
      setShowResults(false);
    } catch (error) {
      console.error("Geolocation button error:", error);
    }
  };

  const styles = StyleSheet.create({
    searchbar: {
      borderRadius: 12,
      backgroundColor: theme.colors.elevation.level3,
    },
  });
  return (
    <View className="z-40 flex-1">
      <Searchbar
        placeholder={t("search.placeholder")}
        onChangeText={handleSearchChange}
        value={searchQuery}
        style={styles.searchbar}
        loading={isLoading}
        onIconPress={handleGeolocationPress}
        icon={"crosshairs-gps"}
      />
      <View className="absolute top-14 z-50 left-0 right-0">
        <LocationSearchResults
          results={results}
          onSelectLocation={handleSelectLocation}
          visible={showResults}
        />
      </View>
    </View>
  );
};
