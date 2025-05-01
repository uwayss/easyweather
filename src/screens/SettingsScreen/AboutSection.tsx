// FILE: src/screens/SettingsScreen/AboutSection.tsx
import React from "react";
import { View } from "react-native";
import { Item, ListSection } from "./Common";
import { openLink } from "./Common";
import { useTranslation } from "react-i18next";
import { APP_VERSION, DATA_SOURCE_URL, DEVELOPER_URL } from "../../constants/config";

function AboutSectionComponent() {
  const { t } = useTranslation();

  return (
    <View>
      <ListSection title={t("about.title")}>
        <Item
          title={t("about.app_version")}
          description={`v${APP_VERSION}`}
          left="information-outline"
        />
        <Item
          title={t("about.data_source")}
          description={t("about.data_source_description")}
          left="database-search-outline"
          onPress={() => openLink(DATA_SOURCE_URL, "data_source")}
          right="open-in-new"
        />
        <Item
          title={t("about.developer")}
          description={t("about.developer_description")}
          left="xml"
          onPress={() => openLink(DEVELOPER_URL, "developer_github")}
          right="open-in-new"
        />
      </ListSection>
      <View className="h-px my-2 bg-light-outline dark:bg-dark-outline" />
    </View>
  );
}
AboutSectionComponent.displayName = "AboutSection";

export const AboutSection = React.memo(AboutSectionComponent);
