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

import { fetchCurrentLocation } from "../api/geolocation";
import {
  MMKV_LOCATION_INSTANCE_ID,
  STORAGE_KEY_LOCATION,
} from "../constants/storage";

const storage = new MMKV({ id: MMKV_LOCATION_INSTANCE_ID });

export interface Location {
  latitude: number;
  longitude: number;
  displayName: string;
}

interface LocationContextProps {
  location: Location | null;
  loading: boolean;
  error: string | null;
  updateLocation: (newLocation: Location) => void;
  fetchInitialLocation: () => Promise<void>;
  getCurrentLocation: () => Promise<void>;
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
        const parsedLocation = JSON.parse(storedLocation) as Location;
        return parsedLocation;
      } catch {
        storage.delete(STORAGE_KEY_LOCATION);
      }
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    storage.set(STORAGE_KEY_LOCATION, JSON.stringify(newLocation));
    setError(null);
  };

  const fetchInitialLocation = useCallback(async () => {
    if (location !== null) {
      return;
    }

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
        updateLocation(newLocation);
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
  }, [location]);

  useEffect(() => {
    fetchInitialLocation();
  }, [fetchInitialLocation]);

  const getCurrentLocation = async () => {
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
      updateLocation({
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
    loading,
    error,
    updateLocation,
    fetchInitialLocation,
    getCurrentLocation,
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
