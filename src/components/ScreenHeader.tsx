// FILE: src/components/ScreenHeader.tsx
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Icon from "./Icon";

interface ScreenHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, showBackButton = true }) => {
  const navigation = useNavigation();
  return (
    <View className={`flex-row items-center h-14 px-2 shadow-sm bg-light-surface dark:bg-dark-surface`}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full">
          <Icon name="arrow-left" size={24}  />
        </TouchableOpacity>
      )}
      <Text className={`text-xl font-medium text-light-onSurface dark:text-dark-onSurface ${showBackButton && 'ml-4'}`}>{title}</Text>
    </View>
  );
};

export default React.memo(ScreenHeader);