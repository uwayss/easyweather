import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import DayDetails from "./src/screens/DayDetails";
import SettingsScreen from "./src/screens/Settings";
import { Platform } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  DayDetails: { date: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: Platform.OS === "ios" ? "modal" : "containedModal",
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="DayDetails"
          component={DayDetails}
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
