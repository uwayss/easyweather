import Card from "@/src/components/Common/Card";
import Skeleton from "@/src/components/Skeleton";
import React from "react";
import { View } from "react-native";

const AirQualityCardSkeleton = () => {
  return (
    <Card elevated className="p-3.5 gap-3 items-center min-h-[220px]">
      <Skeleton height={24} width="50%" className="rounded-lg" />
      <Skeleton height={16} width="100%" className="rounded-lg mt-2" />
      <Skeleton height={60} width="70%" className="rounded-lg my-2" />
      <Skeleton height={18} width="90%" className="rounded-lg" />
      <View className="h-px bg-light-outline/30 dark:bg-dark-outline/30 mt-1 mb-2 w-full" />
      <View className="flex-row justify-around w-full">
        <Skeleton height={40} width="45%" className="rounded-lg" />
        <Skeleton height={40} width="45%" className="rounded-lg" />
      </View>
    </Card>
  );
};

export default AirQualityCardSkeleton;
