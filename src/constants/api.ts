// FILE: src/constants/api.ts
export const GEOLOCATION_API_URL = "http://ip-api.com/json/";
export const GEOLOCATION_API_FIELDS = "?fields=61433";
export const IP_FETCH_API_URL = "https://api.ipify.org?format=json";

export const LOCATION_SEARCH_API_URL =
  "https://nominatim.openstreetmap.org/search";
export const LOCATION_SEARCH_PARAMS = "?format=json&addressdetails=1&limit=3";
export const LOCATION_SEARCH_USER_AGENT = "EasyWeather by Uwayss/1.0";

export const WEATHER_API_BASE_URL = "https://api.open-meteo.com/v1/forecast";
export const WEATHER_API_CURRENT_PARAMS =
  "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,uv_index";
export const WEATHER_API_HOURLY_PARAMS =
  "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,is_day,wind_speed_10m,uv_index";
export const WEATHER_API_DAILY_PARAMS =
  "weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,sunset,sunrise,wind_speed_10m_max";
export const WEATHER_API_DEFAULT_FORECAST_DAYS = "16";
