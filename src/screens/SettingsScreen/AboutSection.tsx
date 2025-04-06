import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import { Item, ListSection } from "./Common";
import { openLink } from "./Common";

const DATA_SOURCE_URL = "https://open-meteo.com/";
const DEVELOPER_URL = "https://www.github.com/uwayss";

const appVersion = "1.0.0";

function AboutSectionComponent() {
  return (
    <View>
      <ListSection title="About">
        <Item title="App Version" description={`v${appVersion}`} left="information-outline" />
        <Item
          title="Data Source"
          description="Open-Meteo API"
          left="database-search-outline"
          onPress={() => openLink(DATA_SOURCE_URL)}
          right="open-in-new"
        />
        <Item
          title="Developer"
          description="Uwayss"
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
