import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { searchLocation, LocationResult } from "../api/location";
import LocationSearchResults from "./LocationSearchResults";

interface LocationSearchProps {
  onLocationSelect: (location: LocationResult) => void;
}

type DebouncedSearchFunction = (query: string) => Promise<void> | void;

function debounce(func: DebouncedSearchFunction, wait: number): DebouncedSearchFunction {
  let timeout: NodeJS.Timeout | null = null;

  return function (query: string) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(query), wait);
  };
}

export const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create debounced search function
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

  const handleSelectLocation = (location: LocationResult) => {
    onLocationSelect(location);
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
        iconColor="#666"
        loading={isLoading}
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
