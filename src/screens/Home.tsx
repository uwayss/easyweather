import React, { useEffect, useState } from "react";
import Wrapper from "../components/index.components";
import { BackHandler, ToastAndroid, Platform } from "react-native";
import { LocationSearch } from "../components/LocationSearch";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";

interface HomeScreenProps {
  onDayPress: (date: string) => void;
}

export default function Home({ onDayPress }: HomeScreenProps) {
  const [isWaitingForSecondBackPress, setIsWaitingForSecondBackPress] = useState(false);

  useEffect(() => {
    if (!(Platform.OS === "android")) return;
    // Only for Android
    const handleBackButtonPress = () => {
      if (isWaitingForSecondBackPress) {
        BackHandler.exitApp();
        return true;
      }

      setIsWaitingForSecondBackPress(true);
      ToastAndroid.show("Press back again to exit app", ToastAndroid.SHORT);
      setTimeout(() => setIsWaitingForSecondBackPress(false), 2000);
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonPress);
    };
  }, [isWaitingForSecondBackPress]); // Dependency array includes waiting state

  return (
    <Wrapper>
      <LocationSearch />
      <WeatherCard />
      <ForecastList onDayPress={onDayPress} />
    </Wrapper>
  );
}
