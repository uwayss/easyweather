import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import Icon from "../../components/Icon";
import { LocationSearch } from "./LocationSearch";

const SearchRowComponent: React.FC = () => {
  const router = useRouter();

  const navigateToSettings = () => {
    router.push("/settings");
  };

  const navigateToLocations = () => {
    router.push("/locations");
  };

  return (
    <View className="flex-row items-center">
      <LocationSearch />
      <TouchableOpacity onPress={navigateToLocations} className="p-2 ml-2">
        <Icon name="bookmark-multiple-outline" size={26} />
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
