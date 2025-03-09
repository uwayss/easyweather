import { ImageSourcePropType } from "react-native";

interface BackgroundMappings {
  [key: number]: { day: ImageSourcePropType; night: ImageSourcePropType };
  default: { day: ImageSourcePropType; night: ImageSourcePropType };
}
const backgroundMappings: BackgroundMappings = {
  default: {
    day: require("../../assets/backgrounds/default_dark.jpg"),
    night: require("../../assets/backgrounds/default_light.jpg"),
  },
  0: {
    day: require("../../assets/backgrounds/clear_day.jpg"),
    night: require("../../assets/backgrounds/clear_night.jpg"),
  },
  1: {
    day: require("../../assets/backgrounds/mainly_clear.jpg"),
    night: require("../../assets/backgrounds/mainly_clear_nigt.jpg"),
  },
  2: {
    day: require("../../assets/backgrounds/partly_cloudy_day.jpg"),
    night: require("../../assets/backgrounds/partly_cloudy_night.jpg"),
  },
  3: {
    day: require("../../assets/backgrounds/cloudy_day.jpg"),
    night: require("../../assets/backgrounds/cloudy_night.jpg"),
  },
  45: {
    day: require("../../assets/backgrounds/foggy_day.jpg"),
    night: require("../../assets/backgrounds/foggy_night.jpg"),
  },
  48: {
    day: require("../../assets/backgrounds/foggy_day.jpg"),
    night: require("../../assets/backgrounds/foggy_night.jpg"),
  },
  51: {
    day: require("../../assets/backgrounds/light_drizzle_day.jpg"),
    night: require("../../assets/backgrounds/light_drizzle_night.jpg"),
  },
  53: {
    day: require("../../assets/backgrounds/drizzle_day.jpg"),
    night: require("../../assets/backgrounds/drizzle_night.jpg"),
  },
  55: {
    day: require("../../assets/backgrounds/heavy_drizzle_day.jpg"),
    night: require("../../assets/backgrounds/heavy_drizzle_night.jpg"),
  },
  56: {
    day: require("../../assets/backgrounds/light_freezing_drizzle_day.jpg"),
    night: require("../../assets/backgrounds/light_freezing_drizzle_night.jpg"),
  },
  57: {
    day: require("../../assets/backgrounds/freezing_drizzle_day.jpg"),
    night: require("../../assets/backgrounds/freezing_drizzle_night.jpg"),
  },
  61: {
    day: require("../../assets/backgrounds/light_rain_day.jpg"),
    night: require("../../assets/backgrounds/light_rain_night.jpg"),
  },
  63: {
    day: require("../../assets/backgrounds/rainy_day.jpg"),
    night: require("../../assets/backgrounds/rainy_night.jpg"),
  },
  65: {
    day: require("../../assets/backgrounds/heavy_rain_day.jpg"),
    night: require("../../assets/backgrounds/heavy_rain_night.jpg"),
  },
  66: {
    day: require("../../assets/backgrounds/light_freezing_rain_day.jpg"),
    night: require("../../assets/backgrounds/light_freezing_rain_night.jpg"),
  },
  67: {
    day: require("../../assets/backgrounds/freezing_rain_day.jpg"),
    night: require("../../assets/backgrounds/freezing_rain_night.jpg"),
  },
  71: {
    day: require("../../assets/backgrounds/light_snow_day.jpg"),
    night: require("../../assets/backgrounds/light_snow_night.jpg"),
  },
  73: {
    day: require("../../assets/backgrounds/snow_day.jpg"),
    night: require("../../assets/backgrounds/snow_night.jpg"),
  },
  75: {
    day: require("../../assets/backgrounds/heavy_snow_day.jpg"),
    night: require("../../assets/backgrounds/heavy_snow_night.jpg"),
  },
  77: {
    day: require("../../assets/backgrounds/snow_grains_day.jpg"),
    night: require("../../assets/backgrounds/snow_grains_night.jpg"),
  },
  80: {
    day: require("../../assets/backgrounds/light_showers_day.jpg"),
    night: require("../../assets/backgrounds/light_showers_night.jpg"),
  },
  81: {
    day: require("../../assets/backgrounds/showers_day.jpg"),
    night: require("../../assets/backgrounds/showers_night.jpg"),
  },
  82: {
    day: require("../../assets/backgrounds/heavy_showers_day.jpg"),
    night: require("../../assets/backgrounds/heavy_showers_night.jpg"),
  },
  85: {
    day: require("../../assets/backgrounds/light_snow_showers_day.jpg"),
    night: require("../../assets/backgrounds/light_snow_showers_night.jpg"),
  },
  86: {
    day: require("../../assets/backgrounds/snow_showers_day.jpg"),
    night: require("../../assets/backgrounds/snow_showers_night.jpg"),
  },
  95: {
    day: require("../../assets/backgrounds/thunderstorm_day.jpg"),
    night: require("../../assets/backgrounds/thunderstorm_night.jpg"),
  },
  96: {
    day: require("../../assets/backgrounds/light_thunderstorm_with_hail_day.jpg"),
    night: require("../../assets/backgrounds/light_thunderstorm_with_hail_night.jpg"),
  },
  99: {
    day: require("../../assets/backgrounds/thunderstorm_with_hail_day.jpg"),
    night: require("../../assets/backgrounds/thunderstorm_with_hail_night.jpg"),
  },
};
export default backgroundMappings;
