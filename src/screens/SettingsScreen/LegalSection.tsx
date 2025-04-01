// FILE: src/screens/SettingsScreen/LegalSection.tsx
import React from "react";
import { Linking, Alert } from "react-native";
import { List, Divider } from "react-native-paper";

// --- Constants ---
const PRIVACY_POLICY_URL = "https://your-privacy-policy-url.com";
const TERMS_SERVICE_URL = "https://your-terms-of-service-url.com";

// --- Helper ---
const openLink = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", `Cannot open this URL: ${url}`);
    }
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
        <List.Item
          title="Terms of Service"
          left={props => <List.Icon {...props} icon="text-box-outline" />}
          onPress={() => openLink(TERMS_SERVICE_URL)}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>
      <Divider />
    </>
  );
};

LegalSectionComponent.displayName = "LegalSection"; // Add displayName

export const LegalSection = React.memo(LegalSectionComponent); // Memoize
