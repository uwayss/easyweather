// FILE: src/screens/DateScreen/DetailItem.tsx
import React from "react";
import { View } from "react-native";
import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";

interface DetailItemProps {
  icon: string;
  label: string;
  value: string;
  unit?: string;
  color?: string;
}

export const DetailItem: React.FC<DetailItemProps> = ({
  icon,
  label,
  value,
  unit,
  color,
}) => {
  return (
    <View className="flex-row items-center gap-2 flex-1">
      <Icon
        name={icon}
        size={20}
        color={color}
        type={icon === "shield-sun-outline" ? "material" : "feather"}
      />
      <View className="items-start flex-1">
        <Text className="font-semibold text-sm">
          {value}
          {unit && (
            <Text className="text-xs ml-0.5 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              {unit}
            </Text>
          )}
        </Text>
        <Text
          className="text-xs mt-px text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant"
          numberOfLines={2}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};
