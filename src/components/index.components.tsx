import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
type WrapperProps = {
  msg?: string;
  children?: ReactNode;
};

export default function Wrapper({ msg, children }: WrapperProps) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      gap: 20,
      backgroundColor: theme.colors.background,
    },
  });
  let content: ReactNode;
  if (msg)
    content = (
      <Text variant="headlineMedium" style={{ textAlign: "center" }}>
        {msg}
      </Text>
    );
  else content = children;
  return <SafeAreaView style={[styles.container]}>{content}</SafeAreaView>;
}
