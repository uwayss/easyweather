// FILE: app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";

import { MaterialTabBar } from "@/src/components/Navigation/MaterialTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MaterialTabBar {...props} />}
    >
      <Tabs.Screen name="locations" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
