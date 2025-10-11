// FILE: app/(tabs)/locations.tsx
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, TouchableOpacity, View } from "react-native";

import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";
import ScreenHeader from "@/src/components/ScreenHeader";
import { SavedLocation } from "@/src/context/LocationContext";
import { useLocationsScreen } from "@/src/hooks/useLocationsScreen";
import { AddLocationButton } from "@/src/screens/LocationsScreen/AddLocationButton";
import { NoLocationsPlaceholder } from "@/src/screens/LocationsScreen/NoLocationsPlaceholder";

const LocationItem = ({
  item,
  onSelect,
  onDelete,
}: {
  item: SavedLocation;
  onSelect: (item: SavedLocation) => void;
  onDelete: (id: string) => void;
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-row items-center justify-between py-3.5 px-4 border-b border-light-outline/20 dark:border-dark-outline/20">
      <Text className="flex-1 text-base mr-3" numberOfLines={2}>
        {item.displayName}
      </Text>
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => onSelect(item)}
          className="py-1.5 px-3 bg-light-primary/10 dark:bg-dark-primary/10 rounded-md mr-2"
        >
          <Text className="text-light-primary dark:text-dark-primary font-medium text-sm">
            {t("location.view")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} className="p-1.5">
          <Icon
            name="trash-can-outline"
            size={22}
            color={colorScheme === "dark" ? "#FF8A80" : "#D32F2F"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function LocationsScreen() {
  const {
    t,
    savedLocations,
    removeSavedLocation,
    handleSelectLocation,
    handleAddCurrentLocation,
    isCurrentActiveLocationSavable,
  } = useLocationsScreen();

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background pt-10">
      <ScreenHeader title={t("location.saved_locations")} />

      {isCurrentActiveLocationSavable && (
        <AddLocationButton onPress={handleAddCurrentLocation} />
      )}

      {savedLocations.length > 0 ? (
        <FlatList
          data={savedLocations}
          renderItem={({ item }) => (
            <LocationItem
              item={item}
              onSelect={handleSelectLocation}
              onDelete={removeSavedLocation}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: isCurrentActiveLocationSavable ? 16 : 4,
            paddingBottom: 20,
          }}
          className="flex-1"
        />
      ) : (
        <NoLocationsPlaceholder />
      )}
    </View>
  );
}
