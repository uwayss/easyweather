import { useState, useCallback, useMemo } from "react";
import { LocationResult, searchLocation } from "../api/location";
import { useLocationContext } from "../context/LocationContext";

type DebouncedSearchFunction = (query: string) => void;

function debounce(
  func: DebouncedSearchFunction,
  wait: number
): DebouncedSearchFunction {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (query: string) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(query), wait);
  };
}

export const useLocationSearch = () => {
  const { setActiveLocation, setError } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(
    async (query: string) => {
      if (query.trim()) {
        try {
          setIsLoading(true);
          const locationResults = await searchLocation(query);
          setResults(locationResults);
          setShowResults(true);
        } catch (error) {
          const msg = `Error searching location: ${String(error)}`;
          setError(msg);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    },
    [setError]
  );

  const debouncedSearch = useMemo(
    () => debounce(performSearch, 500),
    [performSearch]
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSelectLocation = (locationResult: LocationResult) => {
    setActiveLocation({
      latitude: parseFloat(locationResult.lat),
      longitude: parseFloat(locationResult.lon),
      displayName: locationResult.display_name,
    });
    setShowResults(false);
    setSearchQuery("");
  };

  return {
    searchQuery,
    results,
    showResults,
    isLoading,
    handleSearchChange,
    handleSelectLocation,
    setShowResults,
  };
};
