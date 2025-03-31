import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export function BackButton() {
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

export default BackButton;
