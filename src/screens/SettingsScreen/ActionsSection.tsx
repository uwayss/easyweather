// FILE: src/screens/SettingsScreen/ActionsSection.tsx
import React from "react";
import { Share, Platform, Alert } from "react-native";
import { Item, ListSection, openLink } from "./Common";
import { useTranslation } from "react-i18next";
import { getAnalytics } from "@react-native-firebase/analytics";
import {
  FEEDBACK_EMAIL,
  PLAY_STORE_URL_ANDROID,
  APP_STORE_URL_IOS, // Assuming you might add this later
  APP_SHARE_MESSAGE,
  APP_SHARE_URL,
  APP_SHARE_TITLE,
} from "../../constants/config";

const sendFeedback = () => {
  openLink(`mailto:${FEEDBACK_EMAIL}?subject=Weather App Feedback`, "send_feedback_email");
};

const rateApp = () => {
  // Use platform-specific URL or fallback
  const url = Platform.select({
    ios: APP_STORE_URL_IOS || APP_SHARE_URL, // Fallback to share URL if iOS URL isn't set
    android: PLAY_STORE_URL_ANDROID,
    default: APP_SHARE_URL,
  });
  getAnalytics().logEvent("rate_app_clicked");
  openLink(url, "rate_app_store");
};

const shareApp = async () => {
  try {
    getAnalytics().logEvent("share_app_clicked");
    await Share.share({
      message: `${APP_SHARE_MESSAGE}\n${APP_SHARE_URL}`,
      url: APP_SHARE_URL, // Included for platforms that use it
      title: APP_SHARE_TITLE, // Optional title
    });
    getAnalytics().logEvent("share_app_success");
  } catch (error) {
    getAnalytics().logEvent("share_app_failure", { error: String(error) });
    // Use console.error for non-user-facing errors
    console.error("Share app failed:", error);
    // Keep Alert for user feedback if desired
    Alert.alert("Error", "Could not share the app at this time.");
  }
};

const ActionsSectionComponent = React.memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <ListSection title={t("feedback.title")}>
        <Item
          title={t("feedback.send_feedback")}
          description={t("feedback.send_feedback_description")}
          left="email-fast-outline"
          onPress={sendFeedback}
          right="chevron-right"
        />
        <Item
          title={t("feedback.rate_app")}
          description={t("feedback.rate_app_description")}
          left="star-outline"
          onPress={rateApp}
          right="chevron-right"
        />
        <Item
          title={t("feedback.share_app")}
          description={t("feedback.share_app_description")}
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
