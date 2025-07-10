import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export const DataError = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background items-center justify-center">
      <Text className="text-light-onSurface dark:text-dark-onSurface">
        {t("weather.hourly_data_error")}
      </Text>
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-4 p-2 bg-light-primary dark:bg-dark-primary rounded"
      >
        <Text className="text-white dark:text-black">
          {t("common.go_back")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
