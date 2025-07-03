import Card from "@/src/components/Common/Card";
import Divider from "@/src/components/Common/Divider";
import Skeleton from "@/src/components/Skeleton";
import { HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL } from "@/src/constants/ui";
import React from "react";
import { View } from "react-native";

const HourlyConditionsSkeleton = () => {
  return (
    <Card elevated className="overflow-hidden">
      <View
        className="p-4"
        style={{ paddingHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL }}
      >
        <Skeleton height={20} width="40%" className="rounded-lg mb-3" />
        <View className="flex-row gap-2">
          <Skeleton height={32} width={120} className="rounded-lg" />
          <Skeleton height={32} width={120} className="rounded-lg" />
          <Skeleton height={32} width={120} className="rounded-lg" />
        </View>
      </View>
      <Divider
        style={{ marginHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL }}
      />
      <View
        className="h-[153px] p-4 justify-center"
        style={{ paddingHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL }}
      >
        <Skeleton height={120} width="100%" className="rounded-lg" />
      </View>
    </Card>
  );
};

export default HourlyConditionsSkeleton;
