import { ActivityIndicator, Card } from "react-native-paper";
import React from "react";
import { View } from "react-native";

export default function PlaceholderCard({ withoutContainer }: { withoutContainer?: boolean }) {
  return withoutContainer ? (
    <View className="min-h-40 justify-center items-center">
      <ActivityIndicator size="small" color="#006d77" />
    </View>
  ) : (
    <Card className="mb-4 ">
      <Card.Content>
        <ActivityIndicator size="small" color="#006d77" />
      </Card.Content>
    </Card>
  );
}
