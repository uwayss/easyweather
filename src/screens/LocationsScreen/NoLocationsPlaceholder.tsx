import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Common/Text";

export const NoLocationsPlaceholder = () => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 py-10 px-4 items-center justify-center">
      <Icon
        name="bookmark-multiple-outline"
        size={48}
        className="opacity-40 mb-3"
      />
      <Text className="text-lg opacity-60 text-center">
        {t("location.no_saved_locations")}
      </Text>
    </View>
  );
};
