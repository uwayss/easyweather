import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "../../components/Icon";
import { HomeNavigationProp } from "../Home";
import { LocationSearch } from "./LocationSearch";

export default React.memo(function SearchRow({ navigation }: { navigation: HomeNavigationProp }) {
  return (
    <View className="flex-row items-center flex-1">
      <LocationSearch />
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        className="p-2 mr-[-8px] ml-2"
      >
        <Icon name="settings" type="feather" />
      </TouchableOpacity>
    </View>
  );
});
