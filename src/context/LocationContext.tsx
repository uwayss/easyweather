import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { MMKV } from "react-native-mmkv";
import { fetchCurrentLocation } from "../api/geolocation";
import { longToast } from "../utils/debug";

const storage = new MMKV({ id: "location-storage" }); // Reuse the existing storage ID

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
  fetchInitialLocation: () => Promise<void>; // Optional: Function to trigger IP fetch
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
        storage.delete(STORAGE_KEYS.LOCATION); // Clear invalid stored data
      }
    }
    console.log("[LocationContext] No valid stored location found.");
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to update location state and storage
  const updateLocation = (newLocation: Location) => {
    console.log(
      `[LocationContext] Updating location to: ${newLocation.displayName} (${newLocation.latitude}, ${newLocation.longitude})`,
    );
    setLocation(newLocation);
    storage.set(STORAGE_KEYS.LOCATION, JSON.stringify(newLocation));
    setError(null); // Clear previous errors on successful update
  };

  // Function to fetch location from IP if no location exists
  const fetchInitialLocation = async () => {
    // Only fetch if location is currently null
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
        updateLocation(newLocation); // Use the centralized update function
      } else {
        console.warn("[LocationContext] Geolocation data missing lat/lon");
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

  // Fetch initial location on mount if needed
  useEffect(() => {
    fetchInitialLocation();
  }, []); // Run only once on mount

  const value: LocationContextProps = {
    location,
    loading,
    error,
    updateLocation,
    fetchInitialLocation, // Expose if needed elsewhere, e.g., a refresh button
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

// Custom hook to consume the context easily
export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};
