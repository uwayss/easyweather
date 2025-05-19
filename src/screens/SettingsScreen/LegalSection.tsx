// FILE: src/screens/SettingsScreen/LegalSection.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { PRIVACY_POLICY_URL } from "../../constants/config";
import { Item, ListSection , openLink } from "./Common";

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
      <View className="h-px my-2 bg-light-outline dark:bg-dark-outline" />
    </>
  );
};

LegalSectionComponent.displayName = "LegalSection";

export const LegalSection = React.memo(LegalSectionComponent);
