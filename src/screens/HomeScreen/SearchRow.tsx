import { TouchableOpacity, View } from "react-native";
import { HomeNavigationProp } from "../Home";
import React from "react";
import { LocationSearch } from "./LocationSearch";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";

export default React.memo(function SearchRow({ navigation }: { navigation: HomeNavigationProp }) {
  const { t } = useTranslation();
  return (
    <View className="flex-row items-center flex-1">
      <LocationSearch />
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        className="p-2 mr-[-8px] ml-2" // Adjust padding/margin for hit area if needed
        accessibilityLabel={t("settings.title")}
        accessibilityRole="button"
      >
        <Icon name="settings" type="feather" />
      </TouchableOpacity>
    </View>
  );
});
