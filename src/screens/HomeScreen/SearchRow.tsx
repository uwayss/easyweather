// FILE: src/screens/HomeScreen/SearchRow.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import Icon from "../../components/Icon";
import { LocationSearch } from "./LocationSearch";
import SavedLocationsModal from "./SavedLocationsModal";

const SearchRowComponent = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToSettings = () => {
    router.push("/settings");
  };

  return (
    <View className="flex-row items-center flex-1">
      <LocationSearch />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
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
      <SavedLocationsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default React.memo(SearchRowComponent);
