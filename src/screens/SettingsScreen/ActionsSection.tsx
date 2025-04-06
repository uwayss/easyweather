import React from "react";
import { Share, Platform, Alert } from "react-native";
import { Item, ListSection, openLink } from "./Common";

const FEEDBACK_EMAIL = "antar.muhammed1@gmail.com";
const PLAY_STORE_URL_ANDROID = `market://details?id=com.uwayss.easyweather`;
const APP_SHARE_MESSAGE = "Check out this Weather App!";
const APP_SHARE_URL = "https://play.google.com/store/apps/details?id=com.uwayss.easyweather";

const sendFeedback = () => {
  openLink(`mailto:${FEEDBACK_EMAIL}?subject=Weather App Feedback`);
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
      <ListSection title="Feedback & Support">
        <Item
          title="Send Feedback"
          description="Report issues or suggest features"
          left="email-fast-outline"
          onPress={sendFeedback}
          right="chevron-right"
        />
        <Item
          title="Rate This App"
          description="Support us with a review"
          left="star-outline"
          onPress={rateApp}
          right="chevron-right"
        />
        <Item
          title="Share This App"
          description="Tell your friends"
          left="share-variant-outline"
          onPress={shareApp}
          right="chevron-right"
        />
      </ListSection>
    </>
  );
});
ActionsSectionComponent.displayName = "ActionsSection";

export const ActionsSection = React.memo(ActionsSectionComponent);
