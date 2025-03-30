/* eslint-disable @typescript-eslint/no-require-imports */
import { Source } from "react-native-fast-image";

interface BackgroundMappings {
  [key: number]: { day: Source; night: Source };
}
const backgroundMappings: BackgroundMappings = {
  0: {
    day: require("../../assets/backgrounds/clear_day.webp"),
    night: require("../../assets/backgrounds/clear_night.webp"),
  },
  1: {
    day: require("../../assets/backgrounds/mainly_clear.webp"),
    night: require("../../assets/backgrounds/mainly_clear_night.webp"),
  },
  2: {
    day: require("../../assets/backgrounds/partly_cloudy_day.webp"),
    night: require("../../assets/backgrounds/partly_cloudy_night.webp"),
  },
  3: {
    day: require("../../assets/backgrounds/cloudy_day.webp"),
    night: require("../../assets/backgrounds/cloudy_night.webp"),
  },
  45: {
    day: require("../../assets/backgrounds/foggy_day.webp"),
    night: require("../../assets/backgrounds/foggy_night.webp"),
  },
  48: {
    day: require("../../assets/backgrounds/foggy_day.webp"),
    night: require("../../assets/backgrounds/foggy_night.webp"),
  },
  51: {
    day: require("../../assets/backgrounds/light_drizzle_day.webp"),
    night: require("../../assets/backgrounds/light_drizzle_night.webp"),
  },
  53: {
    day: require("../../assets/backgrounds/drizzle_day.webp"),
    night: require("../../assets/backgrounds/drizzle_night.webp"),
  },
  55: {
    day: require("../../assets/backgrounds/heavy_drizzle_day.webp"),
    night: require("../../assets/backgrounds/heavy_drizzle_night.webp"),
  },
  56: {
    day: require("../../assets/backgrounds/light_freezing_drizzle_day.webp"),
    night: require("../../assets/backgrounds/light_freezing_drizzle_night.webp"),
  },
  57: {
    day: require("../../assets/backgrounds/freezing_drizzle_day.webp"),
    night: require("../../assets/backgrounds/freezing_drizzle_night.webp"),
  },
  61: {
    day: require("../../assets/backgrounds/light_rain_day.webp"),
    night: require("../../assets/backgrounds/light_rain_night.webp"),
  },
  63: {
    day: require("../../assets/backgrounds/rainy_day.webp"),
    night: require("../../assets/backgrounds/rainy_night.webp"),
  },
  65: {
    day: require("../../assets/backgrounds/heavy_rain_day.webp"),
    night: require("../../assets/backgrounds/heavy_rain_night.webp"),
  },
  66: {
    day: require("../../assets/backgrounds/light_freezing_rain_day.webp"),
    night: require("../../assets/backgrounds/light_freezing_rain_night.webp"),
  },
  67: {
    day: require("../../assets/backgrounds/freezing_rain_day.webp"),
    night: require("../../assets/backgrounds/freezing_rain_night.webp"),
  },
  71: {
    day: require("../../assets/backgrounds/light_snow_day.webp"),
    night: require("../../assets/backgrounds/light_snow_night.webp"),
  },
  73: {
    day: require("../../assets/backgrounds/snow_day.webp"),
    night: require("../../assets/backgrounds/snow_night.webp"),
  },
  75: {
    day: require("../../assets/backgrounds/heavy_snow_day.webp"),
    night: require("../../assets/backgrounds/heavy_snow_night.webp"),
  },
  77: {
    day: require("../../assets/backgrounds/snow_grains_day.webp"),
    night: require("../../assets/backgrounds/snow_grains_night.webp"),
  },
  80: {
    day: require("../../assets/backgrounds/light_showers_day.webp"),
    night: require("../../assets/backgrounds/light_showers_night.webp"),
  },
  81: {
    day: require("../../assets/backgrounds/showers_day.webp"),
    night: require("../../assets/backgrounds/showers_night.webp"),
  },
  82: {
    day: require("../../assets/backgrounds/heavy_showers_day.webp"),
    night: require("../../assets/backgrounds/heavy_showers_night.webp"),
  },
  85: {
    day: require("../../assets/backgrounds/light_snow_showers_day.webp"),
    night: require("../../assets/backgrounds/light_snow_showers_night.webp"),
  },
  86: {
    day: require("../../assets/backgrounds/snow_showers_day.webp"),
    night: require("../../assets/backgrounds/snow_showers_night.webp"),
  },
  95: {
    day: require("../../assets/backgrounds/thunderstorm_day.webp"),
    night: require("../../assets/backgrounds/thunderstorm_night.webp"),
  },
  96: {
    day: require("../../assets/backgrounds/light_thunderstorm_with_hail_day.webp"),
    night: require("../../assets/backgrounds/light_thunderstorm_with_hail_night.webp"),
  },
  99: {
    day: require("../../assets/backgrounds/thunderstorm_with_hail_day.webp"),
    night: require("../../assets/backgrounds/thunderstorm_with_hail_night.webp"),
  },
};
export default backgroundMappings;
