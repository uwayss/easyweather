// FILE: src/screens/Settings.tsx
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { AboutSection } from "./SettingsScreen/AboutSection";
import { LegalSection } from "./SettingsScreen/LegalSection";
import { ActionsSection } from "./SettingsScreen/ActionsSection";
import UnitsSection from "./SettingsScreen/UnitsSection";
import AppearanceSection from "./SettingsScreen/AppearanceSection";
import LanguageSection from "./SettingsScreen/LanguageSection";
import { useColorScheme } from "nativewind";
import Icon from "../components/Icon";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();

  const headerBg = colorScheme === "dark" ? "bg-dark-surface" : "bg-light-surface";
  const headerText = colorScheme === "dark" ? "text-dark-onSurface" : "text-light-onSurface";
  const iconColor = colorScheme === "dark" ? "#e1e1e1" : "#1f1f1f";

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

      <View className={`flex-row items-center h-14 px-2 shadow-sm ${headerBg}`}>
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full">
          <Icon name="arrow-left" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text className={`text-xl font-medium ml-4 ${headerText}`}>{t("settings.title")}</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 0 }}
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
