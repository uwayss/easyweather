// FILE: src/screens/Settings.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

import ScreenHeader from "@/src/components/ScreenHeader";
import { AboutSection } from "@/src/screens/SettingsScreen/AboutSection";
import { ActionsSection } from "@/src/screens/SettingsScreen/ActionsSection";
import AppearanceSection from "@/src/screens/SettingsScreen/AppearanceSection";
import LanguageSection from "@/src/screens/SettingsScreen/LanguageSection";
import { LegalSection } from "@/src/screens/SettingsScreen/LegalSection";
import UnitsSection from "@/src/screens/SettingsScreen/UnitsSection";

const SettingsScreen = () => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      <ScreenHeader title={t("settings.title")} />

      <ScrollView className="flex-1" contentContainerClassName="py-2 px-0">
        <AppearanceSection />
        <LanguageSection />
        <UnitsSection />
        <AboutSection />
        <LegalSection />
        <ActionsSection />
      </ScrollView>
    </View>
  );
};

export default React.memo(SettingsScreen);
