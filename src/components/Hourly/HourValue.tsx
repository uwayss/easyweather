import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../Common/Text";

interface HourValueProps {
  value: string;
  width: number;
}

const HourValue: React.FC<HourValueProps> = ({ value, width }) => {
  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.valueText} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center",
  },
});

export default React.memo(HourValue);
