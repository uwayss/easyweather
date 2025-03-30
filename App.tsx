import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import DayDetails from "./src/screens/DayDetails";
import SettingsScreen from "./src/screens/Settings";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  DayDetails: { date: string };
  Settings: undefined;
};

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Weather",
        }}
      />
      <Stack.Screen
        name="DayDetails"
        component={DayDetails}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          animation: "slide_from_left",
        }}
      />
    </Stack.Navigator>
  );
}
