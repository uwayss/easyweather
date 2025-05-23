// FILE: src/screens/HomeScreen/SearchRow.tsx
import { useRouter } from "expo-router";
import React from "react"; // Removed useState
import { TouchableOpacity, View } from "react-native";

import Icon from "../../components/Icon";
import { LocationSearch } from "./LocationSearch";
// SavedLocationsModal import removed, as it's now handled by the parent screen

interface SearchRowProps {
  onSavedLocationsPress: () => void; // Prop to handle modal visibility
}

const SearchRowComponent: React.FC<SearchRowProps> = ({
  onSavedLocationsPress,
}) => {
  const router = useRouter();

  const navigateToSettings = () => {
    router.push("/settings");
  };

  return (
    <View className="flex-row items-center flex-1">
      <LocationSearch />
      <TouchableOpacity
        onPress={onSavedLocationsPress} // Use the passed prop
        className="p-2 ml-2"
      >
        <Icon name="playlist-star" size={26} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToSettings}
        className="p-2 mr-[-8px] ml-1"
      >
        <Icon name="settings" type="feather" />
      </TouchableOpacity>
      {/* Modal is no longer rendered here */}
    </View>
  );
};

export default React.memo(SearchRowComponent);
