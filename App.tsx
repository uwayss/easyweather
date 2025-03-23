import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import DayDetails from "./src/screens/DayDetails";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  DayDetails: { date: string };
};

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="DayDetails"
        component={DayDetails}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
}
