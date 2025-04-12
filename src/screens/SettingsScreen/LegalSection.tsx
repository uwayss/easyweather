import React from "react";
import { Divider } from "react-native-paper";
import { Item, ListSection } from "./Common";
import { openLink } from "./Common";
import { useTranslation } from "react-i18next";

const PRIVACY_POLICY_URL = "https://uwayss.github.io/weather-app-privacy-statement/";

const LegalSectionComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <ListSection title={t("legal.title")}>
        <Item
          title={t("legal.privacy_policy")}
          left="shield-lock-outline"
          onPress={() => openLink(PRIVACY_POLICY_URL, "privacy_policy")}
          right="chevron-right"
        />
      </ListSection>
      <Divider />
    </>
  );
};

LegalSectionComponent.displayName = "LegalSection";

export const LegalSection = React.memo(LegalSectionComponent);
