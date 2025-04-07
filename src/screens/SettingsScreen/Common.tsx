import React from "react";
import { Linking, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
export const openLink = async (url: string) => {
  Linking.openURL(url).catch(err => console.error("An error occurred: ", err));
};
export function ListSection({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View style={styles.section}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.colors.onSurfaceVariant,
          },
        ]}
      >
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
      <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress} activeOpacity={0.5}>
        {children}
      </TouchableOpacity>
    ) : (
      <View style={styles.wrapper}>{children}</View>
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
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  section: {
    gap: 24,
    paddingVertical: 12,
  },
  sectionTitle: {
    paddingHorizontal: 16,
  },
});
