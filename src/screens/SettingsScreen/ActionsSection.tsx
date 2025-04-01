// FILE: src/screens/SettingsScreen/ActionsSection.tsx
import React from "react";
import { Linking, Share, Platform, Alert } from "react-native";
import { List } from "react-native-paper";

// --- Constants ---
const FEEDBACK_EMAIL = "antar.muhammed1@gmail.com";
const PLAY_STORE_URL_ANDROID = `market://details?id=com.uwayss.weather`;
const APP_SHARE_MESSAGE = "Check out this Weather App!";
const APP_SHARE_URL = "https://play.google.com/store/apps/details?id=com.uwayss.weather";

// --- Helpers ---
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

const sendFeedback = () => {
  Linking.openURL(`mailto:${FEEDBACK_EMAIL}?subject=Weather App Feedback`);
};

const rateApp = () => {
  const url = Platform.select({
    android: PLAY_STORE_URL_ANDROID,
    default: APP_SHARE_URL,
  });
  openLink(url);
};

const shareApp = async () => {
  try {
    await Share.share({
      message: `${APP_SHARE_MESSAGE}\n${APP_SHARE_URL}`,
      url: APP_SHARE_URL,
      title: "Share Weather App",
    });
  } catch {
    Alert.alert("Error", "Could not share the app at this time.");
  }
};

const ActionsSectionComponent = React.memo(() => {
  return (
    <>
      <List.Section title="Feedback & Support">
        <List.Item
          title="Send Feedback"
          description="Report issues or suggest features"
          left={props => <List.Icon {...props} icon="email-fast-outline" />}
          onPress={sendFeedback}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Rate This App"
          description="Support us with a review"
          left={props => <List.Icon {...props} icon="star-outline" />}
          onPress={rateApp}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Share This App"
          description="Tell your friends"
          left={props => <List.Icon {...props} icon="share-variant-outline" />}
          onPress={shareApp}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>
    </>
  );
});
ActionsSectionComponent.displayName = "ActionsSection"; // Add displayName

export const ActionsSection = React.memo(ActionsSectionComponent); // Memoize
