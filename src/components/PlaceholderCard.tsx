// FILE: src/components/PlaceholderCard.tsx
import React from "react";
import { ActivityIndicator, View } from "react-native"; // Use core ActivityIndicator

export default function PlaceholderCard({ withoutContainer }: { withoutContainer?: boolean }) {
  const indicator = (
    <ActivityIndicator size="small" className="text-light-primary dark:text-dark-primary" />
  );

  return withoutContainer ? (
    <View className="min-h-[160px] justify-center items-center">{indicator}</View>
  ) : (
    <View className="mb-4 p-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm">
      {indicator}
    </View>
  );
}
