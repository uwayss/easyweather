import { StyleSheet, View } from "react-native";
import { HomeNavigationProp } from "../Home";
import React from "react";
import { LocationSearch } from "./LocationSearch";
import { IconButton } from "react-native-paper";
import { useTranslation } from "react-i18next";

export default React.memo(function SearchRow({
  textColor,
  navigation,
}: {
  textColor: string;
  navigation: HomeNavigationProp;
}) {
  const { t } = useTranslation();
  return (
    <View style={styles.topRow}>
      <View style={styles.searchWrapper}>
        <LocationSearch />
      </View>
      <IconButton
        icon="cog-outline"
        iconColor={textColor}
        size={28}
        onPress={() => navigation.navigate("Settings")}
        style={styles.settingsIcon}
        accessibilityLabel={t("settings.title")}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchWrapper: {
    flex: 1,
  },
  settingsIcon: {
    marginLeft: 8,
    marginRight: -8,
  },
});
