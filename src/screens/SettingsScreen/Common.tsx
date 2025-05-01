import React from "react";
import { Linking, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { getAnalytics } from "@react-native-firebase/analytics";

export const openLink = async (url: string, linkContext?: string) => {
  // Add context param
  if (linkContext) {
    getAnalytics().logEvent("open_external_link", {
      target_url: url,
      link_context: linkContext, // e.g., 'privacy_policy', 'developer_github'
    });
  } else {
    getAnalytics().logEvent("open_external_link", {
      target_url: url,
    });
  }
  Linking.openURL(url).catch(err => console.error("An error occurred: ", err));
};
export function ListSection({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View className="gap-6 py-3">
      <Text style={{ color: theme.colors.onSurfaceVariant }} className="px-4">
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
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
}) {
  const Wrapper = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => {
    return onPress ? (
      <TouchableOpacity
        className="flex-row gap-4 justify-between items-center px-4"
        style={[style]}
        onPress={onPress}
        activeOpacity={0.5}
      >
        {children}
      </TouchableOpacity>
    ) : (
      <View className="flex-row gap-4 justify-between items-center px-4">{children}</View>
    );
  };
  return (
    <Wrapper>
      {left && <Icon source={left} size={24} />}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text variant="titleMedium">{title}</Text>
        {description && <Text>{description}</Text>}
      </View>
      {right && <Icon source={right} size={24} />}
    </Wrapper>
  );
}
