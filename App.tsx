// FILE: App.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import SettingsScreen from "./src/screens/Settings";
import DayDetailsScreen from "./src/screens/Details";
import { DayWeather, HourWeather } from "./src/types/weather";
import "./global.css";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  DayDetails: {
    dayData: DayWeather;
    hourlyData: HourWeather[] | undefined;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="DayDetails" component={DayDetailsScreen} />
    </Stack.Navigator>
  );
}
