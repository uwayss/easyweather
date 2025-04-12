import React from "react";
import { Share, Platform, Alert } from "react-native";
import { Item, ListSection, openLink } from "./Common";
import { useTranslation } from "react-i18next";
import { getAnalytics } from "@react-native-firebase/analytics";
const FEEDBACK_EMAIL = "antar.muhammed1@gmail.com";
const PLAY_STORE_URL_ANDROID = `market://details?id=com.uwayss.easyweather`;
const APP_SHARE_MESSAGE = "Check out this Weather App!";
const APP_SHARE_URL = "https://play.google.com/store/apps/details?id=com.uwayss.easyweather";

const sendFeedback = () => {
  openLink(`mailto:${FEEDBACK_EMAIL}?subject=Weather App Feedback`, "send_feedback_email");
};

const rateApp = () => {
  const url = Platform.select({
    android: PLAY_STORE_URL_ANDROID,
    default: APP_SHARE_URL,
  });
  getAnalytics().logEvent("rate_app_clicked");
  openLink(url);
};

const shareApp = async () => {
  try {
    getAnalytics().logEvent("share_app_clicked");
    await Share.share({
      message: `${APP_SHARE_MESSAGE}\n${APP_SHARE_URL}`,
      url: APP_SHARE_URL,
      title: "Share Weather App",
    });
    getAnalytics().logEvent("share_app_success");
  } catch {
    getAnalytics().logEvent("share_app_failure");

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
