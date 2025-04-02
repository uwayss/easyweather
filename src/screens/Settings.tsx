import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { AboutSection } from "./SettingsScreen/AboutSection";
import { LegalSection } from "./SettingsScreen/LegalSection";
import { ActionsSection } from "./SettingsScreen/ActionsSection";
import UnitsSection from "./SettingsScreen/UnitsSection";
import AppearanceSection from "./SettingsScreen/AppearanceSection";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const themeBg = useTheme().colors.background;

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: themeBg }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <AppearanceSection />
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

export default SettingsScreen;
