import Card from "@/src/components/Common/Card";
import Skeleton from "@/src/components/Skeleton";
import React from "react";
import { View } from "react-native";

const WeatherCardSkeleton = () => {
  return (
    <View className="gap-5">
      <Card elevated className="flex-1 p-4 justify-around min-h-[268px]">
        <View className="items-center justify-center flex-1 gap-2">
          <Skeleton height={20} width="60%" className="rounded-lg" />
          <Skeleton height={60} width="45%" className="rounded-lg my-1" />
          <Skeleton height={20} width="70%" className="rounded-lg" />
          <Skeleton height={20} width="50%" className="rounded-lg mt-1" />
        </View>
        <Card
          elevated
          className="flex-row justify-around items-center mt-5 p-4 w-full"
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
      </Card>
    </View>
  );
};

export default WeatherCardSkeleton;
