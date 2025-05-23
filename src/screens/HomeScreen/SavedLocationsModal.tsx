// FILE: src/screens/HomeScreen/SavedLocationsModal.tsx
import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";
import {
  SavedLocation,
  useLocationContext,
} from "@/src/context/LocationContext";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface SavedLocationsModalProps {
  visible: boolean;
  onClose: () => void;
}

const SavedLocationsModal: React.FC<SavedLocationsModalProps> = ({
  visible,
  onClose,
}) => {
  const {
    savedLocations,
    setActiveLocation,
    removeSavedLocation,
    addSavedLocation,
    isLocationSaved,
    location: activeLocation, // current active location
  } = useLocationContext();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const handleSelectLocation = (selectedLoc: SavedLocation) => {
    setActiveLocation(selectedLoc);
    onClose();
  };

  const handleDeleteLocation = (locationId: string) => {
    removeSavedLocation(locationId);
  };

  const handleAddCurrentLocation = () => {
    if (activeLocation && !isLocationSaved(activeLocation)) {
      addSavedLocation(activeLocation);
    }
  };

  const renderItem = ({ item }: { item: SavedLocation }) => (
    <View className="flex-row items-center justify-between p-3 border-b border-light-outline/30 dark:border-dark-outline/30">
      <Text className="flex-1 text-base" numberOfLines={1}>
        {item.displayName}
      </Text>
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => handleSelectLocation(item)}
          className="p-2 mx-1 bg-light-primary/10 dark:bg-dark-primary/10 rounded-md"
        >
          <Text className="text-light-primary dark:text-dark-primary font-medium">
            {t("location.view")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteLocation(item.id)}
          className="p-2 ml-1"
        >
          <Icon
            name="trash-can-outline"
            size={22}
            color={colorScheme === "dark" ? "#FF8A80" : "#D32F2F"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const isCurrentActiveLocationSavable =
    activeLocation &&
    !isLocationSaved(activeLocation) &&
    activeLocation.displayName !== t("weather.current_location");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View className="w-11/12 max-h-[70%] bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden">
          <View className="flex-row items-center justify-between p-4 border-b border-light-outline dark:border-dark-outline">
            <Text className="text-xl font-semibold">
              {t("location.saved_locations")}
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>

          {isCurrentActiveLocationSavable && (
            <TouchableOpacity
              onPress={handleAddCurrentLocation}
              className="p-3 m-3 bg-light-primary dark:bg-dark-primary rounded-md items-center"
            >
              <Text className="text-white dark:text-black font-medium">
                {t("location.add_current")}
              </Text>
            </TouchableOpacity>
          )}

          {savedLocations.length > 0 ? (
            <FlatList
              data={savedLocations}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 10 }}
            />
          ) : (
            <View className="p-10 items-center justify-center">
              <Icon
                name="information-outline"
                size={48}
                className="opacity-50 mb-3"
              />
              <Text className="text-lg opacity-70 text-center">
                {t("location.no_saved_locations")}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
});

export default SavedLocationsModal;
