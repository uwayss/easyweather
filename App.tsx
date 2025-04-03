// App.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import DayDetails from "./src/screens/DayDetails";
import SettingsScreen from "./src/screens/Settings";
import { Platform } from "react-native"; // Keep Platform import

export type RootStackParamList = {
  // Keep your existing ParamList definition
  Home: undefined;
  DayDetails: { date: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      {/* Main screens group (remain the same) */}
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>

      {/* Modal screens group */}
      <Stack.Group
        screenOptions={{
          // You can still define a general presentation type if you want fallbacks
          // or specific iOS styles, but the animation option below takes precedence
          // for the transition itself.
          presentation: Platform.OS === "ios" ? "modal" : "containedModal",
          headerShown: false, // Assuming DayDetails handles its own UI or no header needed
        }}
      >
        <Stack.Screen
          name="DayDetails"
          component={DayDetails}
          options={{
            // --- HERE is the key change ---
            // Force a specific animation on BOTH platforms:
            animation: "slide_from_bottom",

            // Other potential consistent animations:
            // animation: 'fade_from_bottom',
            // animation: 'fade',
            // animation: 'simple_push', // (If you wanted push everywhere)

            // You can also control gesture direction if needed, though defaults
            // for slide_from_bottom are usually correct.
            // gestureDirection: 'vertical',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
