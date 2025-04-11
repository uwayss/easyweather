import React, { useState, useCallback, memo } from "react";
import { View, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useSettings } from "../../context/SettingsContext";
import { ListSection } from "./Common";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

// Memoize language options to prevent unnecessary re-renders
const languages = [
  { value: "en", label: "English" },
  { value: "tr", label: "Türkçe" },
  { value: "ar", label: "العربية" },
];

function LanguageSection() {
  const { updateSetting } = useSettings();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  const currentLanguage =
    languages.find(lang => lang.value === i18next.language)?.label || i18next.language;

  const handleLanguageChange = useCallback(
    (lang: string) => {
      setModalVisible(false);
      i18next.changeLanguage(lang);
      updateSetting("language", lang);
    },
    [updateSetting],
  );

  const renderLanguageItem = useCallback(
    ({
      item,
    }: {
      item: {
        value: string;
        label: string;
      };
    }) => (
      <TouchableOpacity
        style={styles.languageItem}
        onPress={() => handleLanguageChange(item.value)}
        activeOpacity={0.7}
      >
        <Text style={styles.languageText}>{item.label}</Text>
      </TouchableOpacity>
    ),
    [handleLanguageChange],
  );

  return (
    <ListSection title={t("settings.language")}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.languageSelector, { borderColor: theme.colors.outline }]}
        activeOpacity={0.7}
      >
        <Text variant="titleMedium">{currentLanguage}</Text>
        <Text style={{ color: theme.colors.primary }}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <FlatList
              data={languages}
              renderItem={renderLanguageItem}
              keyExtractor={item => item.value}
              style={styles.languageList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </ListSection>
  );
}

const styles = StyleSheet.create({
  languageSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    borderRadius: 8,
    overflow: "hidden",
  },
  languageList: {
    maxHeight: 200,
  },
  languageItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  languageText: {
    fontSize: 16,
  },
});

// Use memo to prevent unnecessary re-renders
export default memo(LanguageSection);
