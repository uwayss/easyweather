import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform, Share } from "react-native";

import {
  APP_SHARE_MESSAGE,
  APP_SHARE_TITLE,
  APP_SHARE_URL,
  APP_STORE_URL_IOS,
  FEEDBACK_EMAIL,
  PLAY_STORE_URL_ANDROID,
} from "../../constants/config";
import { Item, ListSection, openLink } from "./Common";

const sendFeedback = () => {
  openLink(
    `mailto:${FEEDBACK_EMAIL}?subject=Weather App Feedback`,
    "send_feedback_email"
  );
};

const rateApp = () => {
  const url = Platform.select({
    ios: APP_STORE_URL_IOS || APP_SHARE_URL,
    android: PLAY_STORE_URL_ANDROID,
    default: APP_SHARE_URL,
  });
  openLink(url, "rate_app_store");
};

const shareApp = async () => {
  try {
    await Share.share({
      message: `${APP_SHARE_MESSAGE}\n${APP_SHARE_URL}`,
      url: APP_SHARE_URL,
      title: APP_SHARE_TITLE,
    });
  } catch (error) {
    console.error("Share app failed:", error);
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