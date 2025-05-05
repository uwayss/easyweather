// FILE: src/screens/HomeScreen/LocationSearch.tsx
import { getAnalytics } from "@react-native-firebase/analytics";
import { useColorScheme } from "nativewind";
import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

import LocationSearchResults from "./LocationSearchResults";
import { searchLocation, LocationResult } from "../../api/location";
import Icon from "../../components/Icon";
import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../../constants/colors";
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
  const { colorScheme } = useColorScheme();
  const { updateLocation, getCurrentLocation, setError } = useLocationContext();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLocationSelect = (selectedLocation: LocationResult) => {
    updateLocation({
      latitude: parseFloat(selectedLocation.lat),
      longitude: parseFloat(selectedLocation.lon),
      displayName: selectedLocation.display_name,
    });
  };

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
    [setError, updateLocation],
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
  const dark = THEME_COLORS_DARK;
  const light = THEME_COLORS_LIGHT;
  const placeholderTextColor =
    colorScheme === "dark" ? dark.onSurfaceVariant : light.onSurfaceVariant;
  const indicatorColor = colorScheme === "dark" ? dark.primary : light.primary;

  return (
    <View className="z-40 flex-1">
      <View className="flex-row items-center h-14 px-1 rounded-xl bg-light-elevation-level3 dark:bg-dark-elevation-level3">
        <TouchableOpacity onPress={handleGeolocationPress} className="p-2">
          <Icon name="crosshairs-gps" size={22} />
        </TouchableOpacity>
        <TextInput
          placeholder={t("search.placeholder")}
          placeholderTextColor={placeholderTextColor}
          onChangeText={handleSearchChange}
          value={searchQuery}
          className="flex-1 h-full px-3"
          returnKeyType="search"
          onFocus={() => searchQuery && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 150)}
        />
        {isLoading ? (
          <ActivityIndicator size="small" color={indicatorColor} className="px-3" />
        ) : (
          searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearchChange("")} className="p-2">
              <Icon name="x" size={22} type="feather" />
            </TouchableOpacity>
          )
        )}
      </View>
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
