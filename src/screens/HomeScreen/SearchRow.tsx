// FILE: src/screens/HomeScreen/SearchRow.tsx
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import Icon from "../../components/Icon";
import { LocationSearch } from "./LocationSearch";

interface SearchRowProps {
  onSavedLocationsPress: () => void;
}

const SearchRowComponent: React.FC<SearchRowProps> = ({
  onSavedLocationsPress,
}) => {
  const router = useRouter();

  const navigateToSettings = () => {
    router.push("/settings");
  };

  return (
    <View className="flex-row items-center">
      <LocationSearch />
      <TouchableOpacity onPress={onSavedLocationsPress} className="p-2 ml-2">
        <Icon name="playlist-star" size={26} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToSettings}
        className="p-2 mr-[-8px] ml-1"
      >
        <Icon name="settings" type="feather" />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SearchRowComponent);
