import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <Button
      icon="arrow-left"
      mode="outlined"
      onPress={() => navigation.goBack()}
      style={styles.button}
    >
      Back to Forecast
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
});
