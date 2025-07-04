import { Image as ExpoImage, ImageSource } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../Common/Text";

interface HourDetailProps {
  label: string;
  iconSource?: ImageSource;
  width: number;
}

const HourDetail: React.FC<HourDetailProps> = ({
  label,
  iconSource,
  width,
}) => {
  return (
    <View style={[styles.container, { width }]}>
      {iconSource ? (
        <ExpoImage
          source={iconSource}
          style={styles.weatherIcon}
          contentFit="contain"
        />
      ) : (
        <View style={styles.weatherIcon} />
      )}
      <Text style={styles.labelText} numberOfLines={1}>
        {label}
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
  weatherIcon: {
    width: 24,
    height: 24,
    marginBottom: 3,
  },
  labelText: {
    fontSize: 11,
    textAlign: "center",
  },
});

export default React.memo(HourDetail);
