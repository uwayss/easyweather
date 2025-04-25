// FILE: src/utils/descriptions.ts
// --- Find this interface definition ---
interface weatherDescriptionsType {
  [code: number]: {
    day: { description: string; image: number; translationKey: string }; // Changed ImageSourcePropType to number
    night: { description: string; image: number; translationKey: string }; // Changed ImageSourcePropType to number
  };
}

// --- And this one (if separate) ---
// Type definitions for the structured weather descriptions
export interface WeatherDescriptionInfo {
  description: string;
  image: number; // Changed ImageSourcePropType to number
  translationKey: string;
}

import { useCallback } from "react";
// --- No other changes needed in this file, just the type definitions ---
// ... rest of the file remains the same ...

/* eslint-disable @typescript-eslint/no-require-imports */
// import { ImageSourcePropType } from "react-native"; // No longer needed from here
import { useTranslation } from "react-i18next";

// This function returns the weather descriptions with translated text
export function useWeatherDescriptions() {
  const { t } = useTranslation();

  // Memoize the translation process to avoid recalculating on every render
  const getTranslatedDescriptions = useCallback(() => {
    const translatedDescriptions: weatherDescriptionsType = {};

    Object.keys(weatherDescriptions).forEach(code => {
      const numericCode = Number(code);
      if (weatherDescriptions[numericCode]) {
        // Add check if code exists
        translatedDescriptions[numericCode] = {
          day: {
            ...weatherDescriptions[numericCode].day,
            description: t(weatherDescriptions[numericCode].day.translationKey),
          },
          night: {
            ...weatherDescriptions[numericCode].night,
            description: t(weatherDescriptions[numericCode].night.translationKey),
          },
        };
      } else {
        console.warn(`Weather description missing for code: ${numericCode}`);
        // Provide a default fallback if needed
        translatedDescriptions[numericCode] = {
          day: {
            description: "Unknown",
            image: require("../../assets/conditions/cloudy.webp"),
            translationKey: "",
          },
          night: {
            description: "Unknown",
            image: require("../../assets/conditions/cloudy.webp"),
            translationKey: "",
          },
        };
      }
    });

    return translatedDescriptions;
  }, [t]); // Dependency on t

  return getTranslatedDescriptions(); // Return the result of the memoized function
}

const weatherDescriptions: weatherDescriptionsType = {
  0: {
    day: {
      description: "Sunny",
      translationKey: "weather.condition.0.day",
      image: require("../../assets/conditions/sunny.webp"),
    },
    night: {
      description: "Clear",
      translationKey: "weather.condition.0.night",
      image: require("../../assets/conditions/sunny.webp"), // Consider a night clear icon
    },
  },
  1: {
    day: {
      description: "Mainly Sunny",
      translationKey: "weather.condition.1.day",
      image: require("../../assets/conditions/partly_cloudy.webp"), // Maybe slightly cloudy?
    },
    night: {
      description: "Mainly Clear",
      translationKey: "weather.condition.1.night",
      image: require("../../assets/conditions/partly_cloudy.webp"), // Maybe slightly cloudy night?
    },
  },
  2: {
    day: {
      description: "Partly Cloudy",
      translationKey: "weather.condition.2.day",
      image: require("../../assets/conditions/partly_cloudy.webp"),
    },
    night: {
      description: "Partly Cloudy",
      translationKey: "weather.condition.2.night",
      image: require("../../assets/conditions/partly_cloudy.webp"), // Need night version
    },
  },
  3: {
    day: {
      description: "Cloudy",
      translationKey: "weather.condition.3.day",
      image: require("../../assets/conditions/cloudy.webp"),
    },
    night: {
      description: "Cloudy",
      translationKey: "weather.condition.3.night",
      image: require("../../assets/conditions/cloudy.webp"),
    },
  },
  45: {
    day: {
      description: "Foggy",
      translationKey: "weather.condition.45.day",
      image: require("../../assets/conditions/foggy.webp"),
    },
    night: {
      description: "Foggy",
      translationKey: "weather.condition.45.night",
      image: require("../../assets/conditions/foggy.webp"),
    },
  },
  48: {
    day: {
      description: "Rime Fog",
      translationKey: "weather.condition.48.day",
      image: require("../../assets/conditions/foggy.webp"),
    },
    night: {
      description: "Rime Fog",
      translationKey: "weather.condition.48.night",
      image: require("../../assets/conditions/foggy.webp"),
    },
  },
  51: {
    day: {
      description: "Light Drizzle",
      translationKey: "weather.condition.51.day",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Light Drizzle",
      translationKey: "weather.condition.51.night",
      image: require("../../assets/conditions/light_drizzle.webp"), // Need night version
    },
  },
  53: {
    day: {
      description: "Drizzle",
      translationKey: "weather.condition.53.day",
      image: require("../../assets/conditions/light_drizzle.webp"), // Use drizzle icon if exists
    },
    night: {
      description: "Drizzle",
      translationKey: "weather.condition.53.night",
      image: require("../../assets/conditions/light_drizzle.webp"), // Use drizzle night icon if exists
    },
  },
  55: {
    day: {
      description: "Heavy Drizzle",
      translationKey: "weather.condition.55.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Heavy Drizzle",
      translationKey: "weather.condition.55.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"), // Need night version
    },
  },
  56: {
    day: {
      description: "Light Freezing Drizzle",
      translationKey: "weather.condition.56.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"), // Need freezing drizzle icon
    },
    night: {
      description: "Light Freezing Drizzle",
      translationKey: "weather.condition.56.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"), // Need freezing drizzle night icon
    },
  },
  57: {
    day: {
      description: "Freezing Drizzle",
      translationKey: "weather.condition.57.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"), // Need freezing drizzle icon
    },
    night: {
      description: "Freezing Drizzle",
      translationKey: "weather.condition.57.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"), // Need freezing drizzle night icon
    },
  },
  // --- RAIN ---
  61: {
    day: {
      description: "Light Rain",
      translationKey: "weather.condition.61.day",
      image: require("../../assets/conditions/light_drizzle.webp"),
    }, // Use light rain icon
    night: {
      description: "Light Rain",
      translationKey: "weather.condition.61.night",
      image: require("../../assets/conditions/light_drizzle.webp"),
    }, // Use light rain night icon
  },
  63: {
    day: {
      description: "Rain",
      translationKey: "weather.condition.63.day",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use rain icon
    night: {
      description: "Rain",
      translationKey: "weather.condition.63.night",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use rain night icon
  },
  65: {
    day: {
      description: "Heavy Rain",
      translationKey: "weather.condition.65.day",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use heavy rain icon
    night: {
      description: "Heavy Rain",
      translationKey: "weather.condition.65.night",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use heavy rain night icon
  },
  66: {
    day: {
      description: "Light Freezing Rain",
      translationKey: "weather.condition.66.day",
      image: require("../../assets/conditions/light_drizzle.webp"),
    }, // Use freezing rain icon
    night: {
      description: "Light Freezing Rain",
      translationKey: "weather.condition.66.night",
      image: require("../../assets/conditions/light_drizzle.webp"),
    }, // Use freezing rain night icon
  },
  67: {
    day: {
      description: "Freezing Rain",
      translationKey: "weather.condition.67.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    }, // Use freezing rain icon
    night: {
      description: "Freezing Rain",
      translationKey: "weather.condition.67.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    }, // Use freezing rain night icon
  },
  // --- SNOW ---
  71: {
    day: {
      description: "Light Snow",
      translationKey: "weather.condition.71.day",
      image: require("../../assets/conditions/g1800.webp"),
    }, // Use light snow icon
    night: {
      description: "Light Snow",
      translationKey: "weather.condition.71.night",
      image: require("../../assets/conditions/g1800.webp"),
    }, // Use light snow night icon
  },
  73: {
    day: {
      description: "Snow",
      translationKey: "weather.condition.73.day",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use snow icon - reusing rain for now
    night: {
      description: "Snow",
      translationKey: "weather.condition.73.night",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use snow night icon
  },
  75: {
    day: {
      description: "Heavy Snow",
      translationKey: "weather.condition.75.day",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use heavy snow icon - reusing rain
    night: {
      description: "Heavy Snow",
      translationKey: "weather.condition.75.night",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use heavy snow night icon
  },
  77: {
    day: {
      description: "Snow Grains",
      translationKey: "weather.condition.77.day",
      image: require("../../assets/conditions/g1800.webp"),
    }, // Use snow grains icon
    night: {
      description: "Snow Grains",
      translationKey: "weather.condition.77.night",
      image: require("../../assets/conditions/g1800.webp"),
    }, // Use snow grains night icon
  },
  // --- SHOWERS ---
  80: {
    day: {
      description: "Light Showers",
      translationKey: "weather.condition.80.day",
      image: require("../../assets/conditions/light_drizzle.webp"),
    }, // Use showers icon
    night: {
      description: "Light Showers",
      translationKey: "weather.condition.80.night",
      image: require("../../assets/conditions/light_drizzle.webp"),
    }, // Use showers night icon
  },
  81: {
    day: {
      description: "Showers",
      translationKey: "weather.condition.81.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    }, // Use moderate showers icon
    night: {
      description: "Showers",
      translationKey: "weather.condition.81.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    }, // Use moderate showers night icon
  },
  82: {
    day: {
      description: "Heavy Showers",
      translationKey: "weather.condition.82.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    }, // Use heavy showers icon
    night: {
      description: "Heavy Showers",
      translationKey: "weather.condition.82.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    }, // Use heavy showers night icon
  },
  // --- SNOW SHOWERS ---
  85: {
    day: {
      description: "Light Snow Showers",
      translationKey: "weather.condition.85.day",
      image: require("../../assets/conditions/g1800.webp"),
    }, // Use snow showers icon
    night: {
      description: "Light Snow Showers",
      translationKey: "weather.condition.85.night",
      image: require("../../assets/conditions/g1800.webp"),
    }, // Use snow showers night icon
  },
  86: {
    day: {
      description: "Snow Showers",
      translationKey: "weather.condition.86.day",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use snow showers icon - reusing rain
    night: {
      description: "Snow Showers",
      translationKey: "weather.condition.86.night",
      image: require("../../assets/conditions/g2376.webp"),
    }, // Use snow showers night icon
  },
  // --- THUNDERSTORM ---
  95: {
    day: {
      description: "Thunderstorm",
      translationKey: "weather.condition.95.day",
      image: require("../../assets/conditions/g860.webp"),
    }, // Use thunderstorm icon
    night: {
      description: "Thunderstorm",
      translationKey: "weather.condition.95.night",
      image: require("../../assets/conditions/g860.webp"),
    }, // Use thunderstorm night icon
  },
  96: {
    day: {
      description: "Light Thunderstorms With Hail",
      translationKey: "weather.condition.96.day",
      image: require("../../assets/conditions/g860.webp"),
    }, // Use thunderstorm hail icon
    night: {
      description: "Light Thunderstorms With Hail",
      translationKey: "weather.condition.96.night",
      image: require("../../assets/conditions/g860.webp"),
    }, // Use thunderstorm hail night icon
  },
  99: {
    day: {
      description: "Thunderstorm With Hail",
      translationKey: "weather.condition.99.day",
      image: require("../../assets/conditions/g860.webp"),
    }, // Use thunderstorm heavy hail icon
    night: {
      description: "Thunderstorm With Hail",
      translationKey: "weather.condition.99.night",
      image: require("../../assets/conditions/g860.webp"),
    }, // Use thunderstorm heavy hail night icon
  },
};
// Default export remains the same
export default weatherDescriptions; // Keep the non-hook export if used elsewhere
