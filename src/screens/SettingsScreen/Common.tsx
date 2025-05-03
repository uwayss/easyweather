// FILE: src/screens/SettingsScreen/Common.tsx
import React from "react";
import { Linking, TouchableOpacity, View, ViewStyle } from "react-native";
import { getAnalytics } from "@react-native-firebase/analytics";
// Removed Feather import
import Icon from "../../components/Icon"; // Import custom Icon component
import { useColorScheme } from "nativewind";
import Text from "../../components/Common/Text";

export const openLink = async (url: string, linkContext?: string) => {
  if (linkContext) {
    getAnalytics().logEvent("open_external_link", {
      target_url: url,
      link_context: linkContext,
    });
  } else {
    getAnalytics().logEvent("open_external_link", {
      target_url: url,
    });
  }
  Linking.openURL(url).catch(err => console.error("An error occurred: ", err));
};

export function ListSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-6 py-3">
      <Text className="px-4 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
        {title}
      </Text>
      {children}
    </View>
  );
}

export function Item({
  title,
  description,
  left,
  right,
  onPress,
}: {
  title: string;
  description?: string;
  left?: string; // Keep as string
  right?: string; // Keep as string
  onPress?: () => void;
}) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#e1e1e1" : "#1f1f1f";
  const descriptionColor =
    colorScheme === "dark" ? "text-dark-onSurfaceVariant" : "text-light-onSurfaceVariant";

  const Wrapper = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => {
    return onPress ? (
      <TouchableOpacity
        className="flex-row gap-4 justify-between items-center px-4 min-h-[48px] py-2"
        style={[style]}
        onPress={onPress}
        activeOpacity={0.5}
      >
        {children}
      </TouchableOpacity>
    ) : (
      <View className="flex-row gap-4 justify-between items-center px-4 min-h-[48px] py-2">
        {children}
      </View>
    );
  };
  return (
    <Wrapper>
      {/* Use custom Icon component */}
      {left && <Icon name={left} size={24} color={iconColor} />}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>{title}</Text>
        {description && <Text className={`text-sm ${descriptionColor}`}>{description}</Text>}
      </View>
      {/* Use custom Icon component */}
      {right && <Icon name={right} size={24} color={iconColor} />}
    </Wrapper>
  );
}
