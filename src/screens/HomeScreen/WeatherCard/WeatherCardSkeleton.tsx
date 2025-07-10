import Card from "@/src/components/Common/Card";
import Skeleton from "@/src/components/Skeleton";
import React from "react";
import { View } from "react-native";

function MainInfoSkeleton() {
  return (
    <Card
      className="items-center justify-evenly flex-1 gap-3 p-4 h-48"
      elevated
    >
      <Skeleton height={15} width="60%" className="rounded-lg" />
      <Skeleton height={30} width="50%" className="rounded-lg" />
      <Skeleton height={15} width="50%" className="rounded-lg" />
      <Skeleton height={15} width="40%" className="rounded-lg" />
    </Card>
  );
}

function DetailsSkeleton() {
  return (
    <Card
      elevated
      className="flex-row justify-around items-center p-4 w-full h-16"
    >
      <View className="flex-1 items-center gap-1">
        <Skeleton height={16} width="80%" className="rounded-md" />
        <Skeleton height={20} width="50%" className="rounded-md" />
      </View>
      <View className="w-px h-full bg-neutral-400/30 mx-2" />
      <View className="flex-1 items-center gap-1">
        <Skeleton height={16} width="80%" className="rounded-md" />
        <Skeleton height={20} width="60%" className="rounded-md" />
      </View>
      <View className="w-px h-full bg-neutral-400/30 mx-2" />
      <View className="flex-1 items-center gap-1">
        <Skeleton height={16} width="80%" className="rounded-md" />
        <Skeleton height={20} width="70%" className="rounded-md" />
      </View>
    </Card>
  );
}

function AnimatedWeatherSummarySkeleton() {
  return (
    <Card elevated className="w-full h-7 items-center justify-center">
      <Skeleton height={12} width="60%" className="rounded-md items-center" />
    </Card>
  );
}

const WeatherCardSkeleton = () => {
  return (
    <Card elevated className="p-4 justify-around h-90 gap-5">
      <MainInfoSkeleton />
      <View className="gap-2">
        <DetailsSkeleton />
        <AnimatedWeatherSummarySkeleton />
      </View>
    </Card>
  );
};

export default WeatherCardSkeleton;
