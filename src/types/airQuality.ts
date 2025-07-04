export interface AirQualityAPIResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  current_units?: {
    time?: string;
    interval?: string;
    us_aqi?: string;
    pm2_5?: string;
    ozone?: string;
  };
  current?: {
    time: string;
    interval: number;
    us_aqi?: number;
    pm2_5?: number;
    ozone?: number;
  };
  hourly_units?: {
    time?: string;
    us_aqi?: string;
    pm2_5?: string;
    ozone?: string;
  };
  hourly?: {
    time: string[];
    us_aqi?: (number | null)[];
    pm2_5?: (number | null)[];
    ozone?: (number | null)[];
  };
}

export interface CurrentAirQualityData {
  time: string;
  interval: number;
  usAqi?: number;
  pm2_5?: number;
  ozone?: number;
}
