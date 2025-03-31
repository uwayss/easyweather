import React from "react";
import { View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { styles } from "./styles";

export function DayTitle({ title }: { title: string | undefined }) {
  return (
    <View>
      {title ? (
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator style={styles.title} size="large" />
      )}
    </View>
  );
}

export default DayTitle;
