import React from "react";
import { ScrollView, StyleSheet } from "react-native";
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
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={t("settings.title")} />
      </Appbar.Header>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
});

export default React.memo(SettingsScreen);
