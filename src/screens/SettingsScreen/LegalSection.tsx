import React from "react";
import { Linking, Alert } from "react-native";
import { List, Divider } from "react-native-paper";

const PRIVACY_POLICY_URL = "https://github.com/Uwayss/weather-v2#privacy-statement";

const openLink = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert("Error", "An error occurred while trying to open the link.");
  }
};

const LegalSectionComponent = () => {
  return (
    <>
      <List.Section title="Legal">
        <List.Item
          title="Privacy Policy"
          left={props => <List.Icon {...props} icon="shield-lock-outline" />}
          onPress={() => openLink(PRIVACY_POLICY_URL)}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>
      <Divider />
    </>
  );
};

LegalSectionComponent.displayName = "LegalSection";

export const LegalSection = React.memo(LegalSectionComponent);
