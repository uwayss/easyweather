import { View, ViewStyle } from "react-native";
import React from "react";

export default function Divider({ style }: { style?: ViewStyle }) {
  return <View className="h-px bg-light-outline dark:bg-dark-outline mx-4" style={style} />;
}
