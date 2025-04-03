import { ActivityIndicator, Card } from "react-native-paper";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PlaceholderCard({ withoutContainer }: { withoutContainer?: boolean }) {
  return withoutContainer ? (
    <View style={styles.placeholderContainer}>
      <ActivityIndicator size="small" color="#006d77" />
    </View>
  ) : (
    <Card style={[styles.card, styles.placeholderContainer]}>
      <Card.Content>
        <ActivityIndicator size="small" color="#006d77" />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  placeholderContainer: {
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
