import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View, BackHandler, Platform } from "react-native";
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
import BottomSheet, { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import DayDetails from "./Details";
import { DayWeather, HourWeather } from "../types/weather";
import { Backdrop } from "./HomeScreen/BackDrop";
import MobileAds, {
  InterstitialAd,
  AdEventType,
  MaxAdContentRating,
} from "react-native-google-mobile-ads";
import { getAnalytics } from "@react-native-firebase/analytics";

// Set global ad content rating to family-friendly
MobileAds().setRequestConfiguration({
  // Set max ad content rating to family-friendly (G rating)
  maxAdContentRating: MaxAdContentRating.G,
  // Enable Google's child-directed treatment
  tagForChildDirectedTreatment: true,
  // Enable Google's under-age-of-consent treatment
  tagForUnderAgeOfConsent: true,
});

// Create an interstitial ad instance
const adUnitId = Platform.select({
  android: "ca-app-pub-2933834243243547/1658013245", // Using the banner ad ID for now, replace with actual interstitial ad ID
  ios: "ca-app-pub-2933834243243547/1658013245", // Using the banner ad ID for now, replace with actual interstitial ad ID
});

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeProps = {
  navigation: HomeNavigationProp;
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
  const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  // Load the interstitial ad
  useEffect(() => {
    const loadInterstitialAd = () => {
      const ad = InterstitialAd.createForAdRequest(adUnitId || "");

      const unsubscribeLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
        console.log("Interstitial ad loaded");
        setAdLoaded(true);
      });

      const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
        console.log("Interstitial ad closed");
        // Exit the app after ad is closed
        BackHandler.exitApp();
      });

      const unsubscribeError = ad.addAdEventListener(AdEventType.ERROR, error => {
        console.warn("Interstitial ad error:", error);
        // Check if it's a no-fill error
        if (error && error.message && error.message.includes("no-fill")) {
          console.log("No ad available, continuing app execution");
          // Don't exit the app for no-fill errors
          setAdLoaded(false);
        } else {
          // For other errors, exit the app
          BackHandler.exitApp();
        }
      });

      // Start loading the ad
      ad.load();
      setInterstitialAd(ad);

      // Cleanup function
      return () => {
        unsubscribeLoaded();
        unsubscribeClosed();
        unsubscribeError();
      };
    };

    loadInterstitialAd();
  }, []);

  // Handle back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      // Check if we're on the home screen using navigation state
      const currentRoute = navigation.getState().routes;
      const isHomeScreen = currentRoute[currentRoute.length - 1].name === "Home";

      if (isHomeScreen) {
        // Only show ad when exiting from home screen
        if (interstitialAd && adLoaded) {
          try {
            // Show the ad
            getAnalytics().logEvent("show_interstitial_ad_on_exit"); // Log attempt
            interstitialAd.show();
            return true; // Prevent default behavior
          } catch (error) {
            console.warn("Error showing ad:", error);
            // If showing ad fails, exit the app
            BackHandler.exitApp();
            return true;
          }
        } else {
          // If ad is not loaded, just exit the app
          BackHandler.exitApp();
          return true;
        }
      }

      // For other screens, just go back normally
      return false;
    });

    return () => backHandler.remove();
  }, [interstitialAd, adLoaded]);

  const handleClosePress = useCallback(() => {
    getAnalytics().logEvent("close_daily_details");
    bottomSheetRef.current?.close();
  }, []);

  const snapPoints = useMemo(() => ["90%"], []);

  const onRefresh = async () => {
    console.log("Pull to refresh triggered");

    if (location) {
      setRefreshing(true);
      console.log("Fetching weather data...");
      try {
        getAnalytics().logEvent("pull_to_refresh");
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
    [handleClosePress],
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
        snapPoints={snapPoints}
        index={-1}
        backdropComponent={renderBackdrop}
        handleStyle={{
          backgroundColor: theme.colors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.onSurface,
        }}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        enableContentPanningGesture={false}
        enableHandlePanningGesture
        enablePanDownToClose
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
