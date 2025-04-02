import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";

export default function DayTitle({ title }: { title: string | undefined }) {
  return (
    <View>
      {title ? (
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
