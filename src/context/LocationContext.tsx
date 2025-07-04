import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocationExpo from "expo-location";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

import { fetchCurrentLocation } from "../api/geolocation";
import {
  STORAGE_KEY_LOCATION,
  STORAGE_KEY_SAVED_LOCATIONS,
} from "../constants/storage";

export interface Location {
  latitude: number;
  longitude: number;
  displayName: string;
}

export interface SavedLocation extends Location {
  id: string;
}

interface LocationContextProps {
  location: Location | null;
  savedLocations: SavedLocation[];
  loading: boolean;
  error: string | null;
  setActiveLocation: (newLocation: Location) => Promise<void>;
  getCurrentLocation: () => Promise<void>;
  addSavedLocation: (locationToSave: Location) => Promise<void>;
  removeSavedLocation: (locationId: string) => Promise<void>;
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

  const [location, setLocation] = useState<Location | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const setActiveLocation = async (newLocation: Location) => {
    setLocation(newLocation);
    setError(null);
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_LOCATION,
        JSON.stringify(newLocation)
      );
    } catch (e) {
      console.error("Failed to save active location", e);
    }
  };

  const addSavedLocation = async (locationToSave: Location) => {
    const newId = `${locationToSave.latitude}_${locationToSave.longitude}`;
    if (savedLocations.some((loc) => loc.id === newId)) {
      return;
    }
    const newSavedLocation: SavedLocation = { ...locationToSave, id: newId };
    const updatedSavedLocations = [...savedLocations, newSavedLocation];
    setSavedLocations(updatedSavedLocations);
    Toast.show({ type: "success", text1: t("location.saved_toast") });
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_SAVED_LOCATIONS,
        JSON.stringify(updatedSavedLocations)
      );
    } catch (e) {
      console.error("Failed to save locations", e);
    }
  };

  const removeSavedLocation = async (locationId: string) => {
    const isRemovingActive =
      location && `${location.latitude}_${location.longitude}` === locationId;

    const updatedSavedLocations = savedLocations.filter(
      (loc) => loc.id !== locationId
    );
    setSavedLocations(updatedSavedLocations);
    Toast.show({ type: "info", text1: t("location.removed_toast") });

    if (isRemovingActive) {
      if (updatedSavedLocations.length > 0) {
        await setActiveLocation(updatedSavedLocations[0]);
      } else {
        setLocation(null);
        await AsyncStorage.removeItem(STORAGE_KEY_LOCATION);
      }
    }

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_SAVED_LOCATIONS,
        JSON.stringify(updatedSavedLocations)
      );
    } catch (e) {
      console.error("Failed to save locations after removal", e);
    }
  };

  const isLocationSaved = (locationToCheck: Location | null): boolean => {
    if (!locationToCheck) return false;
    const checkId = `${locationToCheck.latitude}_${locationToCheck.longitude}`;
    return savedLocations.some((loc) => loc.id === checkId);
  };

  useEffect(() => {
    const fetchInitialLocation = async () => {
      setLoading(true);
      setError(null);
      try {
        const [storedLocation, storedSavedLocations] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY_LOCATION),
          AsyncStorage.getItem(STORAGE_KEY_SAVED_LOCATIONS),
        ]);

        let activeLoc: Location | null = null;
        let savedLocs: SavedLocation[] = [];

        if (storedSavedLocations) {
          savedLocs = JSON.parse(storedSavedLocations);
          setSavedLocations(savedLocs);
        }

        if (storedLocation) {
          activeLoc = JSON.parse(storedLocation);
          setLocation(activeLoc);
        }

        if (activeLoc) {
          return;
        }

        if (savedLocs.length > 0) {
          await setActiveLocation(savedLocs[0]);
          return;
        }

        const geoData = await fetchCurrentLocation();
        if (geoData.lat && geoData.lon) {
          const newLocation: Location = {
            latitude: geoData.lat,
            longitude: geoData.lon,
            displayName: geoData.city
              ? `${geoData.city}, ${geoData.country}`
              : `${geoData.country}`,
          };
          await setActiveLocation(newLocation);
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
    };

    fetchInitialLocation();
  }, []);

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const { status } = await LocationExpo.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission denied by user.");
      }
      const position = await LocationExpo.getCurrentPositionAsync({});
      await setActiveLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        displayName: t("weather.current_location"),
      });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to get current location";
      setError(msg);
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
