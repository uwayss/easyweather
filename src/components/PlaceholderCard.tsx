// FILE: src/components/PlaceholderCard.tsx
import { ActivityIndicator, View } from "react-native"; // Use core ActivityIndicator
import React from "react";

export default function PlaceholderCard({ withoutContainer }: { withoutContainer?: boolean }) {
  const indicator = (
    <ActivityIndicator size="small" color="#006d77" className="dark:text-dark-primary" />
  );

  return withoutContainer ? (
    <View className="min-h-[160px] justify-center items-center">{indicator}</View>
  ) : (
    <View className="mb-4 p-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm">
      {indicator}
    </View>
  );
}
