import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";

interface LocationDisplayProps {
  name: string;
  canBeSaved?: boolean;
  isSaved?: boolean;
  onToggleSave: () => void;
  starIconColor: string;
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({
  name,
  canBeSaved,
  isSaved,
  onToggleSave,
  starIconColor,
}) => {
  return (
    <View className="p-3 self-center w-full bg-transparent flex-row items-center justify-center">
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-center text-sm max-w-[80%]"
        pop
      >
        {name}
      </Text>
      {canBeSaved && (
        <TouchableOpacity onPress={onToggleSave} className="ml-2 p-1">
          <Icon
            name={isSaved ? "star" : "star-outline"}
            size={20}
            color={starIconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
