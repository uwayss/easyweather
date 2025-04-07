import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import { Item, ListSection } from "./Common";
import { openLink } from "./Common";
import { useTranslation } from "react-i18next";

const DATA_SOURCE_URL = "https://open-meteo.com/";
const DEVELOPER_URL = "https://www.github.com/uwayss";

const appVersion = "1.0.0";

function AboutSectionComponent() {
  const { t } = useTranslation();

  return (
    <View>
      <ListSection title={t("about.title")}>
        <Item
          title={t("about.app_version")}
          description={`v${appVersion}`}
          left="information-outline"
        />
        <Item
          title={t("about.data_source")}
          description={t("about.data_source_description")}
          left="database-search-outline"
          onPress={() => openLink(DATA_SOURCE_URL)}
          right="open-in-new"
        />
        <Item
          title={t("about.developer")}
          description={t("about.developer_description")}
          left="xml"
          onPress={() => openLink(DEVELOPER_URL)}
          right="open-in-new"
        />
      </ListSection>
      <Divider />
    </View>
  );
}
AboutSectionComponent.displayName = "AboutSection";

export const AboutSection = React.memo(AboutSectionComponent);
