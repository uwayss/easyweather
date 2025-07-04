import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";

import Card from "../../components/Common/Card";
import Divider from "../../components/Common/Divider";
import Text from "../../components/Common/Text";
import Icon from "../../components/Icon";
import { SUPPORTED_LANGUAGES } from "../../constants/settings";
import { useSettings } from "../../context/SettingsContext";
import { ListSection } from "./Common";

const LanguageOption = ({
  item,
  isSelected,
  onPress,
}: {
  item: { value: string; label: string };
  isSelected: boolean;
  onPress: (value: string) => void;
}) => (
  <TouchableOpacity
    onPress={() => onPress(item.value)}
    className="flex-row items-center justify-between p-4 border-b border-light-outline/20 dark:border-dark-outline/20"
  >
    <Text
      className={`text-base ${
        isSelected ? "font-bold text-light-primary dark:text-dark-primary" : ""
      }`}
    >
      {item.label}
    </Text>
    {isSelected && (
      <Icon
        name="check"
        size={24}
        className="text-light-primary dark:text-dark-primary"
      />
    )}
  </TouchableOpacity>
);

function LanguageSection() {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageChange = useCallback(
    (lang: string) => {
      updateSetting("language", lang);
      setModalVisible(false);
    },
    [updateSetting]
  );

  const currentLanguageLabel =
    SUPPORTED_LANGUAGES.find((lang) => lang.value === settings.language)
      ?.label || settings.language;

  const renderItem = ({ item }: { item: { value: string; label: string } }) => (
    <LanguageOption
      item={item}
      isSelected={settings.language === item.value}
      onPress={handleLanguageChange}
    />
  );

  return (
    <>
      <ListSection title={t("settings.language")}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Card className="mx-4 flex-row items-center justify-between p-3.5">
            <Text>{currentLanguageLabel}</Text>
            <Icon name="chevron-down" size={24} />
          </Card>
        </TouchableOpacity>
        <Divider />
      </ListSection>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-light-surface dark:bg-dark-surface rounded-t-2xl max-h-[50%]">
            <View className="flex-row items-center justify-between p-4 border-b border-light-outline dark:border-dark-outline">
              <Text className="text-lg font-bold">
                {t("settings.language")}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="p-1"
              >
                <Icon name="close" size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={SUPPORTED_LANGUAGES}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

export default memo(LanguageSection);
