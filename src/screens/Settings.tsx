// FILE: src/screens/Settings.tsx
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AboutSection } from "./SettingsScreen/AboutSection";
import { ActionsSection } from "./SettingsScreen/ActionsSection";
import AppearanceSection from "./SettingsScreen/AppearanceSection";
import LanguageSection from "./SettingsScreen/LanguageSection";
import { LegalSection } from "./SettingsScreen/LegalSection";
import UnitsSection from "./SettingsScreen/UnitsSection";
import ScreenHeader from "../components/ScreenHeader";

const SettingsScreen = () => {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      className="flex-1 bg-light-background dark:bg-dark-background"
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          colorScheme === "dark" ? darkThemeColors.surface : lightThemeColors.surface
        }
      />

      <ScreenHeader title={t("settings.title")} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="py-2 px-0"
      >
        <AppearanceSection />
        <LanguageSection />
        <UnitsSection />
        <AboutSection />
        <LegalSection />
        <ActionsSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const lightThemeColors = { surface: "#ffffff" };
const darkThemeColors = { surface: "#1e1e1e" };

export default React.memo(SettingsScreen);