import { useRouter } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SavedLocation, useLocationContext } from "../context/LocationContext";

export const useLocationsScreen = () => {
  const router = useRouter();
  const {
    savedLocations,
    setActiveLocation,
    removeSavedLocation,
    addSavedLocation,
    isLocationSaved,
    location: activeLocation,
  } = useLocationContext();
  const { t } = useTranslation();

  const handleSelectLocation = (selectedLoc: SavedLocation) => {
    setActiveLocation(selectedLoc);
    router.back();
  };

  const handleAddCurrentLocation = () => {
    if (activeLocation && !isLocationSaved(activeLocation)) {
      addSavedLocation(activeLocation);
    }
  };

  const isCurrentActiveLocationSavable = useMemo(
    () =>
      activeLocation &&
      !isLocationSaved(activeLocation) &&
      activeLocation.displayName !== t("weather.current_location") &&
      activeLocation.displayName !== t("weather.loading_location") &&
      activeLocation.displayName !== t("weather.unknown_location"),
    [activeLocation, isLocationSaved, t]
  );

  return {
    t,
    savedLocations,
    removeSavedLocation,
    handleSelectLocation,
    handleAddCurrentLocation,
    isCurrentActiveLocationSavable,
  };
};
