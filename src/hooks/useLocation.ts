import { useState, useEffect } from "react";
import { MMKV } from "react-native-mmkv";
import { fetchCurrentLocation } from "../api/geolocation";
import { longToast } from "../utils/debug";

const storage = new MMKV({ id: "location-storage" });

export interface Location {
  latitude: number;
  longitude: number;
  displayName: string;
}

const STORAGE_KEYS = {
  LOCATION: "user-location",
};

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(() => {
    const storedLocation = storage.getString(STORAGE_KEYS.LOCATION);
    // const storedLocation = null; // Keep this for when you wanna test geolocation
    if (storedLocation) {
      try {
        const parsedLocation = JSON.parse(storedLocation) as Location;
        console.log("[useLocation] Loaded stored location:", parsedLocation.displayName);
        return parsedLocation;
      } catch (e) {
        console.error("[useLocation] Failed to parse stored location: ", e);
        longToast("[useLocation] Failed to parse stored location: " + e);
      }
    }

    console.log("[useLocation] No stored location, will use IP geolocation");
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateLocation = (newLocation: Location) => {
    console.log("[useLocation] Updating location to:", newLocation.displayName);
    setLocation(newLocation);
    storage.set(STORAGE_KEYS.LOCATION, JSON.stringify(newLocation));
  };

  useEffect(() => {
    const getLocationFromIp = async () => {
      // Skip if we already have a stored location
      if (location !== null) {
        console.log("[useLocation] Skipping IP geolocation, using stored location");
        return;
      }

      console.log("[useLocation] Attempting to get location from IP");
      try {
        setLoading(true);
        setError(null);

        // Use the abstracted geolocation API
        const geoData = await fetchCurrentLocation();

        // Update location with IP-based geolocation
        if (geoData.lat && geoData.lon) {
          const newLocation: Location = {
            latitude: geoData.lat,
            longitude: geoData.lon,
            displayName: geoData.city
              ? `${geoData.city}, ${geoData.country}`
              : `${geoData.country}`,
          };

          console.log("[useLocation] Setting location from IP:", newLocation.displayName);
          updateLocation(newLocation);
        } else {
          console.warn("[useLocation] Geolocation data missing lat/lon");
          longToast("[useLocation] Geolocation data missing lat/lon");
        }
      } catch (err) {
        console.error("[useLocation] Error getting location from IP: ", err);
        longToast("[useLocation] Error getting location from IP: " + err);
        setError(err instanceof Error ? err.message : "Failed to get location");
      } finally {
        setLoading(false);
        console.log("[useLocation] Finished location fetch attempt");
      }
    };

    getLocationFromIp();
  }, [location]);

  return { location, updateLocation, loading, error };
}
