import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Platform, TouchableOpacity, View } from "react-native";

import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";
import ScreenHeader from "@/src/components/ScreenHeader";
import { SavedLocation } from "@/src/context/LocationContext";
import { useLocationsScreen } from "@/src/hooks/useLocationsScreen";

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
        <View className="px-4 pt-4">
          <TouchableOpacity
            onPress={handleAddCurrentLocation}
            className="p-3 bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline rounded-lg items-center justify-center flex-row shadow-sm active:opacity-80"
          >
            <Icon
              name="plus-circle-outline"
              size={20}
              className="text-light-primary dark:text-dark-primary mr-2"
            />
            <Text
              className="text-light-primary dark:text-dark-primary font-semibold text-center text-sm"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {t("location.add_current")}
            </Text>
          </TouchableOpacity>
        </View>
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
            paddingBottom: Platform.OS === "ios" ? 20 : 10,
          }}
          className="flex-1"
        />
      ) : (
        <View className="flex-1 py-10 px-4 items-center justify-center">
          <Icon
            name="bookmark-multiple-outline"
            size={48}
            className="opacity-40 mb-3"
          />
          <Text className="text-lg opacity-60 text-center">
            {t("location.no_saved_locations")}
          </Text>
        </View>
      )}
    </View>
  );
}
