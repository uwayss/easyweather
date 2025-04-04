import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";
import HourlyConditions from "../components/HourlyConditions";
import { useLocationContext } from "../context/LocationContext";
import { useWeather } from "../context/WeatherContext";
import { filterHourlyWeatherForNext24HoursIncludingNow } from "../utils/weatherUtils";
import ForecastList from "./HomeScreen/ForecastList";
import WeatherCard from "./HomeScreen/WeatherCard";
import SearchRow from "./HomeScreen/SearchRow";
import BottomSheet, { BottomSheetBackdropProps, useBottomSheet } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import DayDetails from "./Details";
import { DayWeather, HourWeather } from "../types/weather";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeProps = {
  navigation: HomeNavigationProp;
};

export const Backdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const { close } = useBottomSheet();

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => {
    "worklet";
    const isHidden = animatedIndex.value === -1;

    return {
      opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.75], Extrapolation.CLAMP),
      backgroundColor: "rgba(0,0,0,0.4)",
      backfaceVisibility: "hidden",
      pointerEvents: isHidden ? "none" : "auto",
      display: isHidden ? "none" : "flex",
    };
  });

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        flex: 1,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  const closeSheet = () => {
    close();
  };

  const backdropTap = Gesture.Tap().maxDuration(100000).onEnd(closeSheet).runOnJS(true);

  return (
    <GestureDetector gesture={backdropTap}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[containerStyle, styles.backdrop, style]}
      />
    </GestureDetector>
  );
};
export default function Home({ navigation }: HomeProps) {
  const theme = useTheme();
  const { weather, fetchWeatherData } = useWeather();
  const [refreshing, setRefreshing] = useState(false);
  const { location } = useLocationContext();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDayData, setSelectedDayData] = useState<DayWeather | undefined>(undefined);
  const [selectedHourlyData, setSelectedHourlyData] = useState<HourWeather[] | undefined>(
    undefined,
  );
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const snapPoints = useMemo(() => ["90%"], []);

  const onRefresh = async () => {
    console.log("Pull to refresh triggered");

    if (location) {
      setRefreshing(true);
      console.log("Fetching weather data...");
      try {
        await fetchWeatherData(location.latitude, location.longitude);
        console.log("Weather data fetched");
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setRefreshing(false);
      }
    } else {
      console.error("Cannot refresh - location is not available");
      setRefreshing(false);
    }
  };
  const todaysHourlyData = useMemo(
    () => filterHourlyWeatherForNext24HoursIncludingNow(weather?.hourly),
    [weather?.hourly],
  );
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <Backdrop {...props} />,
    [handleClosePress], // Add dependency
  );
  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <SearchRow textColor={theme.colors.onSurface} navigation={navigation} />
        <WeatherCard />
        <View>
          <HourlyConditions selectedDateHourly={todaysHourlyData} />
        </View>
        <ForecastList
          bottomSheetRef={bottomSheetRef}
          setSelectedDayData={setSelectedDayData}
          setSelectedHourlyData={setSelectedHourlyData}
        />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={-1}
        backdropComponent={renderBackdrop}
        handleStyle={{ backgroundColor: theme.colors.background }}
        enableContentPanningGesture={false}
        enablePanDownToClose={false}
        enableHandlePanningGesture
      >
        <DayDetails selectedDateHourly={selectedHourlyData} selectedDay={selectedDayData} />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    gap: 20,
  },
  backdrop: {
    height: "100%",
    width: "100%",
  },
});
