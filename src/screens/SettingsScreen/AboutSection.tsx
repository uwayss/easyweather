// FILE: src/screens/SettingsScreen/AboutSection.tsx
import React from "react";
import { Linking, Alert, View } from "react-native";
import { List, Divider } from "react-native-paper";
// Optional: import DeviceInfo from 'react-native-device-info';

// --- Constants ---
const DATA_SOURCE_URL = "https://open-meteo.com/";
const DEVELOPER_URL = "https://www.github.com/uwayss"; // Your portfolio/github
// const appVersion = DeviceInfo.getVersion(); // Use this if installed
const appVersion = "1.0.0";

// --- Helper ---
const openLink = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert("Error", "An error occurred while trying to open the link.");
  }
};

function AboutSectionComponent() {
  return (
    <View>
      <List.Section title="About">
        <List.Item
          title="App Version"
          description={`v${appVersion}`}
          left={props => <List.Icon {...props} icon="information-outline" />}
        />
        <List.Item
          title="Data Source"
          description="Open-Meteo API"
          left={props => <List.Icon {...props} icon="database-search-outline" />}
          onPress={() => openLink(DATA_SOURCE_URL)}
          right={props => <List.Icon {...props} icon="open-in-new" />}
        />
        <List.Item
          title="Developer"
          description="Muhammed Uwayss"
          left={props => <List.Icon {...props} icon="xml" />}
          onPress={() => openLink(DEVELOPER_URL)}
          right={props => <List.Icon {...props} icon="open-in-new" />}
        />
      </List.Section>
      <Divider />
    </View>
  );
}
AboutSectionComponent.displayName = "AboutSection";

export const AboutSection = React.memo(AboutSectionComponent); // Memoize the named component
