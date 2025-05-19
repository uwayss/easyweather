// FILE: src/screens/HomeScreen/SearchRow.tsx
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import Icon from "../../components/Icon";
import { LocationSearch } from "./LocationSearch";

const SearchRowComponent = () => {
  const router = useRouter();

  const navigateToSettings = () => {
    router.push("/settings");
  };

  return (
    <View className="flex-row items-center flex-1">
      <LocationSearch />
      <TouchableOpacity
        onPress={navigateToSettings}
        className="p-2 mr-[-8px] ml-2"
      >
        <Icon name="settings" type="feather" />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SearchRowComponent);
