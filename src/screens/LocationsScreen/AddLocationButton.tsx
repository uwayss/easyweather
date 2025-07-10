import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Common/Text";

interface AddLocationButtonProps {
  onPress: () => void;
}

export const AddLocationButton: React.FC<AddLocationButtonProps> = ({
  onPress,
}) => {
  const { t } = useTranslation();
  return (
    <View className="px-4 pt-4">
      <TouchableOpacity
        onPress={onPress}
        className="p-3 bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline rounded-lg items-center justify-center flex-row shadow-sm active:opacity-80"
      >
        <Icon
          name="plus-circle-outline"
          size={20}
          className="text-light-primary dark:text-dark-primary mr-2"
        />
        <Text
          className="text-light-primary dark:text-dark-primary font-semibold text-center text-sm"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {t("location.add_current")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
