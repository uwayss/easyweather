import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "../../components/Icon";
import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../../constants/colors";
import { useLocationContext } from "../../context/LocationContext";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import LocationSearchResults from "./LocationSearchResults";

export const LocationSearch = () => {
  const { colorScheme } = useColorScheme();
  const { getCurrentLocation } = useLocationContext();
  const { t } = useTranslation();
  const {
    searchQuery,
    results,
    showResults,
    isLoading,
    handleSearchChange,
    handleSelectLocation,
    setShowResults,
  } = useLocationSearch();

  const handleGeolocationPress = async () => {
    try {
      await getCurrentLocation();
      handleSearchChange("");
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
  const textInputColor =
    colorScheme === "dark" ? dark.onSurface : light.onSurface;

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
          style={{ color: textInputColor }}
          returnKeyType="search"
          onFocus={() => searchQuery && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 150)}
        />
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={indicatorColor}
            className="px-3"
          />
        ) : (
          searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearchChange("")}
              className="p-2"
            >
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
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};
