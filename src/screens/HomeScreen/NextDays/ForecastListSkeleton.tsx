import Card from "@/src/components/Common/Card";
import Skeleton from "@/src/components/Skeleton";
import React from "react";
import { ScrollView } from "react-native";

const ForecastListSkeleton = () => {
  return (
    <Card borderType="hidden">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            elevated
            className="mr-4 items-center justify-between p-3 gap-1.5 w-36 h-48"
          >
            <Skeleton height={20} width="80%" className="rounded-md" />
            <Skeleton height={64} width={64} className="rounded-full my-1" />
            <Skeleton height={16} width="90%" className="rounded-md" />
            <Skeleton height={24} width="60%" className="rounded-md" />
          </Card>
        ))}
      </ScrollView>
    </Card>
  );
};

export default ForecastListSkeleton;
