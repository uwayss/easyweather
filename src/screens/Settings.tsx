import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { AboutSection } from "./SettingsScreen/AboutSection";
import { LegalSection } from "./SettingsScreen/LegalSection";
import { ActionsSection } from "./SettingsScreen/ActionsSection";
import UnitsSection from "./SettingsScreen/UnitsSection";
import AppearanceSection from "./SettingsScreen/AppearanceSection";
import LanguageSection from "./SettingsScreen/LanguageSection";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }} className="flex-1">
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={t("settings.title")} />
      </Appbar.Header>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingVertical: 8,
          paddingHorizontal: 0,
        }}
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

export default React.memo(SettingsScreen);
