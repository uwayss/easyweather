// FILE: src\context\LocationContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { MMKV } from "react-native-mmkv";
import { fetchCurrentLocation } from "../api/geolocation";
import Geolocation from "react-native-geolocation-service";
import { Platform, PermissionsAndroid } from "react-native";
import { useTranslation } from "react-i18next";
import { getAnalytics } from "@react-native-firebase/analytics";

const storage = new MMKV({ id: "location-storage" });

export interface Location {
  latitude: number;
  longitude: number;
  displayName: string;
}

const STORAGE_KEYS = {
  LOCATION: "user-location",
};

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

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Location | null>(() => {
    const storedLocation = storage.getString(STORAGE_KEYS.LOCATION);
    if (storedLocation) {
      try {
        const parsedLocation = JSON.parse(storedLocation) as Location;
        return parsedLocation;
      } catch {
        // Error parsing, delete the invalid key
        storage.delete(STORAGE_KEYS.LOCATION);
      }
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    storage.set(STORAGE_KEYS.LOCATION, JSON.stringify(newLocation));
    setError(null);
  };

  const fetchInitialLocation = async () => {
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
          displayName: geoData.city ? `${geoData.city}, ${geoData.country}` : `${geoData.country}`,
        };
        updateLocation(newLocation);
      } else {
        setError("Failed to retrieve coordinates from IP.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get location from IP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialLocation();
  }, []); // fetchInitialLocation should only run once on mount

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          getAnalytics().logEvent("request_gps_location_permission_denied");
          throw new Error("Location permission denied");
        }
      } else {
        const status = await Geolocation.requestAuthorization("whenInUse");
        if (status !== "granted") {
          throw new Error("Location permission denied");
        }
      }

      const position = await new Promise<Geolocation.GeoPosition>((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, error => reject(new Error(error.message)), {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
      });
      getAnalytics().logEvent("request_gps_location_success");
      updateLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        displayName: t("weather.current_location"),
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to get current location";
      setError(msg);
      getAnalytics().logEvent("request_gps_location_failed", { error: String(err) });
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

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};
