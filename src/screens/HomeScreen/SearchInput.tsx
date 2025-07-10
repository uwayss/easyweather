import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  TextInputProps,
} from "react-native";
import Icon from "@/src/components/Icon";

interface SearchInputProps extends TextInputProps {
  isLoading: boolean;
  onGeolocationPress: () => void;
  onClearPress: () => void;
  indicatorColor: string;
  searchQuery: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  isLoading,
  onGeolocationPress,
  onClearPress,
  indicatorColor,
  searchQuery,
  ...props
}) => {
  return (
    <View className="flex-row items-center h-14 px-1 rounded-xl bg-light-elevation-level3 dark:bg-dark-elevation-level3">
      <TouchableOpacity onPress={onGeolocationPress} className="p-2">
        <Icon name="crosshairs-gps" size={22} />
      </TouchableOpacity>
      <TextInput className="flex-1 h-full px-3" {...props} />
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={indicatorColor}
          className="px-3"
        />
      ) : (
        searchQuery.length > 0 && (
          <TouchableOpacity onPress={onClearPress} className="p-2">
            <Icon name="x" size={22} type="feather" />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};
