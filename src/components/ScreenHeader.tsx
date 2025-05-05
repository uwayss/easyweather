// FILE: src/components/ScreenHeader.tsx
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Icon from "./Icon";

interface ScreenHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, showBackButton = true }) => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  const headerBg = colorScheme === "dark" ? "bg-dark-surface" : "bg-light-surface";
  const headerText = colorScheme === "dark" ? "text-dark-onSurface" : "text-light-onSurface";
  const iconColor = colorScheme === "dark" ? "#e1e1e1" : "#1f1f1f";

  return (
    <View className={`flex-row items-center h-14 px-2 shadow-sm ${headerBg}`}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full">
          <Icon name="arrow-left" size={24} color={iconColor} />
        </TouchableOpacity>
      )}
      <Text className={`text-xl font-medium ${showBackButton ? 'ml-4' : ''} ${headerText}`}>{title}</Text>
    </View>
  );
};

export default React.memo(ScreenHeader);