import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { MMKV } from "react-native-mmkv";
import { fetchCurrentLocation } from "../api/geolocation";
import { longToast } from "../utils/debug";
import Geolocation from "react-native-geolocation-service";
import { Platform, PermissionsAndroid } from "react-native";
import { useTranslation } from "react-i18next";
import analytics from "@react-native-firebase/analytics";

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
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Location | null>(() => {
    const storedLocation = storage.getString(STORAGE_KEYS.LOCATION);
    if (storedLocation) {
      try {
        const parsedLocation = JSON.parse(storedLocation) as Location;
        console.log("[LocationContext] Loaded stored location:", parsedLocation.displayName);
        return parsedLocation;
      } catch (e) {
        console.error("[LocationContext] Failed to parse stored location: ", e);
        longToast("[LocationContext] Failed to parse stored location: " + e);
        storage.delete(STORAGE_KEYS.LOCATION);
      }
    }
    console.log("[LocationContext] No valid stored location found.");
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateLocation = (newLocation: Location) => {
    console.log(
      `[LocationContext] Updating location to: ${newLocation.displayName} (${newLocation.latitude}, ${newLocation.longitude})`,
    );
    setLocation(newLocation);
    storage.set(STORAGE_KEYS.LOCATION, JSON.stringify(newLocation));
    setError(null);
  };

  const fetchInitialLocation = async () => {
    if (location !== null) {
      console.log("[LocationContext] Skipping IP fetch, location already exists.");
      return;
    }

    console.log("[LocationContext] Attempting to get location from IP");
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
        console.log("[LocationContext] Geolocation data missing lat/lon");
        longToast("[LocationContext] Geolocation data missing lat/lon");
        setError("Failed to retrieve coordinates from IP.");
      }
    } catch (err) {
      console.error("[LocationContext] Error getting location from IP: ", err);
      longToast(
        "[LocationContext] Error getting location from IP: " +
          (err instanceof Error ? err.message : String(err)),
      );
      setError(err instanceof Error ? err.message : "Failed to get location from IP");
    } finally {
      setLoading(false);
      console.log("[LocationContext] Finished initial location fetch attempt");
    }
  };

  useEffect(() => {
    fetchInitialLocation();
  }, []);

  const getCurrentLocation = async () => {
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
          analytics().logEvent("request_gps_location_permission_denied");
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
      analytics().logEvent("request_gps_location_success");
      updateLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        displayName: t("weather.current_location"),
      });
    } catch (error) {
      console.error("Geolocation error:", error);
      longToast(error instanceof Error ? error.message : "Failed to get location");
      analytics().logEvent("request_gps_location_failed", { error: error });
      throw error;
    }
  };

  const value: LocationContextProps = {
    location,
    loading,
    error,
    updateLocation,
    fetchInitialLocation,
    getCurrentLocation,
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
