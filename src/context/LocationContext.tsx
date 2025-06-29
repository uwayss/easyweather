// FILE: src/context/LocationContext.tsx
import { getAnalytics } from "@react-native-firebase/analytics";
import * as LocationExpo from "expo-location";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { MMKV } from "react-native-mmkv";
import Toast from "react-native-toast-message";

import { fetchCurrentLocation } from "../api/geolocation";
import {
  MMKV_LOCATION_INSTANCE_ID,
  STORAGE_KEY_LOCATION,
  STORAGE_KEY_SAVED_LOCATIONS,
} from "../constants/storage";

const storage = new MMKV({ id: MMKV_LOCATION_INSTANCE_ID });

export interface Location {
  latitude: number;
  longitude: number;
  displayName: string;
}

export interface SavedLocation extends Location {
  id: string; // Unique ID, e.g., `${latitude}_${longitude}`
}

interface LocationContextProps {
  location: Location | null; // Currently active location
  savedLocations: SavedLocation[];
  loading: boolean;
  error: string | null;
  setActiveLocation: (newLocation: Location) => void;
  fetchInitialLocation: () => Promise<void>;
  getCurrentLocation: () => Promise<void>;
  addSavedLocation: (locationToSave: Location) => void;
  removeSavedLocation: (locationId: string) => void;
  isLocationSaved: (locationToCheck: Location | null) => boolean;
  clearError: () => void;
  setError: (message: string | null) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();

  const [location, setLocation] = useState<Location | null>(() => {
    const storedLocation = storage.getString(STORAGE_KEY_LOCATION);
    if (storedLocation) {
      try {
        return JSON.parse(storedLocation) as Location;
      } catch {
        storage.delete(STORAGE_KEY_LOCATION);
      }
    }
    return null;
  });

  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(() => {
    const stored = storage.getString(STORAGE_KEY_SAVED_LOCATIONS);
    if (stored) {
      try {
        return JSON.parse(stored) as SavedLocation[];
      } catch {
        storage.delete(STORAGE_KEY_SAVED_LOCATIONS);
      }
    }
    return [];
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const setActiveLocation = (newLocation: Location) => {
    setLocation(newLocation);
    storage.set(STORAGE_KEY_LOCATION, JSON.stringify(newLocation));
    setError(null); // Clear error when a new location is set
    getAnalytics().logEvent("set_active_location", {
      name: newLocation.displayName,
    });
  };

  const addSavedLocation = (locationToSave: Location) => {
    const newId = `${locationToSave.latitude}_${locationToSave.longitude}`;
    if (savedLocations.some((loc) => loc.id === newId)) {
      // Already saved
      return;
    }
    const newSavedLocation: SavedLocation = { ...locationToSave, id: newId };
    const updatedSavedLocations = [...savedLocations, newSavedLocation];
    setSavedLocations(updatedSavedLocations);
    storage.set(
      STORAGE_KEY_SAVED_LOCATIONS,
      JSON.stringify(updatedSavedLocations)
    );
    Toast.show({ type: "success", text1: t("location.saved_toast") });
    getAnalytics().logEvent("add_saved_location", {
      name: locationToSave.displayName,
    });
  };

  const removeSavedLocation = (locationId: string) => {
    const updatedSavedLocations = savedLocations.filter(
      (loc) => loc.id !== locationId
    );
    setSavedLocations(updatedSavedLocations);
    storage.set(
      STORAGE_KEY_SAVED_LOCATIONS,
      JSON.stringify(updatedSavedLocations)
    );
    Toast.show({ type: "info", text1: t("location.removed_toast") });
    const removedLocation = savedLocations.find((l) => l.id === locationId);
    if (removedLocation) {
      getAnalytics().logEvent("remove_saved_location", {
        name: removedLocation.displayName,
      });
    }
  };

  const isLocationSaved = (locationToCheck: Location | null): boolean => {
    if (!locationToCheck) return false;
    const checkId = `${locationToCheck.latitude}_${locationToCheck.longitude}`;
    return savedLocations.some((loc) => loc.id === checkId);
  };

  const fetchInitialLocation = useCallback(async () => {
    if (location !== null) {
      // If active location is already set (e.g. from storage)
      return;
    }
    if (savedLocations.length > 0) {
      // If no active, but saved locations exist, set first as active
      setActiveLocation(savedLocations[0]);
      return;
    }

    // If no active and no saved, fetch by IP
    setLoading(true);
    setError(null);
    try {
      const geoData = await fetchCurrentLocation();
      if (geoData.lat && geoData.lon) {
        const newLocation: Location = {
          latitude: geoData.lat,
          longitude: geoData.lon,
          displayName: geoData.city
            ? `${geoData.city}, ${geoData.country}`
            : `${geoData.country}`,
        };
        setActiveLocation(newLocation);
      } else {
        setError("Failed to retrieve coordinates from IP.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get location from IP"
      );
    } finally {
      setLoading(false);
    }
  }, [location, savedLocations]); // Added savedLocations dependency

  useEffect(() => {
    fetchInitialLocation();
  }, [fetchInitialLocation]);

  const getCurrentLocation = async () => {
    // Fetches GPS location
    setLoading(true);
    setError(null);
    try {
      const { status } = await LocationExpo.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        getAnalytics().logEvent("request_gps_location_permission_denied");
        throw new Error("Location permission denied by user.");
      }

      const position = await LocationExpo.getCurrentPositionAsync({});
      getAnalytics().logEvent("request_gps_location_success");
      setActiveLocation({
        // Use setActiveLocation
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        displayName: t("weather.current_location"),
      });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to get current location";
      setError(msg);
      getAnalytics().logEvent("request_gps_location_failed", {
        error: String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  const value: LocationContextProps = {
    location,
    savedLocations,
    loading,
    error,
    setActiveLocation,
    fetchInitialLocation,
    getCurrentLocation,
    addSavedLocation,
    removeSavedLocation,
    isLocationSaved,
    clearError,
    setError,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return context;
};
