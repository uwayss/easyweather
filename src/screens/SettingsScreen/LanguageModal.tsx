import React from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";
import { SUPPORTED_LANGUAGES } from "@/src/constants/settings";

interface LanguageOptionProps {
  item: { value: string; label: string };
  isSelected: boolean;
  onPress: (value: string) => void;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({
  item,
  isSelected,
  onPress,
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

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  visible,
  onClose,
  currentLanguage,
  onLanguageChange,
}) => {
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: { value: string; label: string } }) => (
    <LanguageOption
      item={item}
      isSelected={currentLanguage === item.value}
      onPress={onLanguageChange}
    />
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-light-surface dark:bg-dark-surface rounded-t-2xl max-h-[50%]">
          <View className="flex-row items-center justify-between p-4 border-b border-light-outline dark:border-dark-outline">
            <Text className="text-lg font-bold">{t("settings.language")}</Text>
            <TouchableOpacity onPress={onClose} className="p-1">
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
  );
};
