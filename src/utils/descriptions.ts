// FILE: src/utils/descriptions.ts
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface weatherDescriptionsType {
  [code: number]: {
    day: { description: string; image: number; translationKey: string };
    night: { description: string; image: number; translationKey: string };
  };
}

export interface WeatherDescriptionInfo {
  description: string;
  image: number;
  translationKey: string;
}

export function useWeatherDescriptions() {
  const { t } = useTranslation();

  const getTranslatedDescriptions = useCallback(() => {
    const translatedDescriptionsResult: weatherDescriptionsType = {};

    Object.keys(weatherDescriptions).forEach((codeStr) => {
      const numericCode = Number(codeStr);
      const baseDescription = weatherDescriptions[numericCode];

      if (baseDescription) {
        translatedDescriptionsResult[numericCode] = {
          day: {
            ...baseDescription.day,
            description: t(baseDescription.day.translationKey),
          },
          night: {
            ...baseDescription.night,
            description: t(baseDescription.night.translationKey),
          },
        };
      }
    });
    return translatedDescriptionsResult;
  }, [t]);

  return useMemo(
    () => getTranslatedDescriptions(),
    [getTranslatedDescriptions]
  );
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
      image: require("../../assets/conditions/sunny.webp"),
    },
  },
  1: {
    day: {
      description: "Mainly Sunny",
      translationKey: "weather.condition.1.day",
      image: require("../../assets/conditions/partly_cloudy.webp"),
    },
    night: {
      description: "Mainly Clear",
      translationKey: "weather.condition.1.night",
      image: require("../../assets/conditions/partly_cloudy.webp"),
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
      image: require("../../assets/conditions/partly_cloudy.webp"),
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
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
  },
  53: {
    day: {
      description: "Drizzle",
      translationKey: "weather.condition.53.day",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Drizzle",
      translationKey: "weather.condition.53.night",
      image: require("../../assets/conditions/light_drizzle.webp"),
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
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },
  56: {
    day: {
      description: "Light Freezing Drizzle",
      translationKey: "weather.condition.56.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Light Freezing Drizzle",
      translationKey: "weather.condition.56.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },
  57: {
    day: {
      description: "Freezing Drizzle",
      translationKey: "weather.condition.57.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Freezing Drizzle",
      translationKey: "weather.condition.57.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },

  61: {
    day: {
      description: "Light Rain",
      translationKey: "weather.condition.61.day",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Light Rain",
      translationKey: "weather.condition.61.night",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
  },
  63: {
    day: {
      description: "Rain",
      translationKey: "weather.condition.63.day",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Rain",
      translationKey: "weather.condition.63.night",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },
  65: {
    day: {
      description: "Heavy Rain",
      translationKey: "weather.condition.65.day",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Heavy Rain",
      translationKey: "weather.condition.65.night",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },
  66: {
    day: {
      description: "Light Freezing Rain",
      translationKey: "weather.condition.66.day",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Light Freezing Rain",
      translationKey: "weather.condition.66.night",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
  },
  67: {
    day: {
      description: "Freezing Rain",
      translationKey: "weather.condition.67.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Freezing Rain",
      translationKey: "weather.condition.67.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },

  71: {
    day: {
      description: "Light Snow",
      translationKey: "weather.condition.71.day",
      image: require("../../assets/conditions/g1800.webp"),
    },
    night: {
      description: "Light Snow",
      translationKey: "weather.condition.71.night",
      image: require("../../assets/conditions/g1800.webp"),
    },
  },
  73: {
    day: {
      description: "Snow",
      translationKey: "weather.condition.73.day",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Snow",
      translationKey: "weather.condition.73.night",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },
  75: {
    day: {
      description: "Heavy Snow",
      translationKey: "weather.condition.75.day",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Heavy Snow",
      translationKey: "weather.condition.75.night",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },
  77: {
    day: {
      description: "Snow Grains",
      translationKey: "weather.condition.77.day",
      image: require("../../assets/conditions/g1800.webp"),
    },
    night: {
      description: "Snow Grains",
      translationKey: "weather.condition.77.night",
      image: require("../../assets/conditions/g1800.webp"),
    },
  },

  80: {
    day: {
      description: "Light Showers",
      translationKey: "weather.condition.80.day",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Light Showers",
      translationKey: "weather.condition.80.night",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
  },
  81: {
    day: {
      description: "Showers",
      translationKey: "weather.condition.81.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Showers",
      translationKey: "weather.condition.81.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },
  82: {
    day: {
      description: "Heavy Showers",
      translationKey: "weather.condition.82.day",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Heavy Showers",
      translationKey: "weather.condition.82.night",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },

  85: {
    day: {
      description: "Light Snow Showers",
      translationKey: "weather.condition.85.day",
      image: require("../../assets/conditions/g1800.webp"),
    },
    night: {
      description: "Light Snow Showers",
      translationKey: "weather.condition.85.night",
      image: require("../../assets/conditions/g1800.webp"),
    },
  },
  86: {
    day: {
      description: "Snow Showers",
      translationKey: "weather.condition.86.day",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Snow Showers",
      translationKey: "weather.condition.86.night",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },

  95: {
    day: {
      description: "Thunderstorm",
      translationKey: "weather.condition.95.day",
      image: require("../../assets/conditions/g860.webp"),
    },
    night: {
      description: "Thunderstorm",
      translationKey: "weather.condition.95.night",
      image: require("../../assets/conditions/g860.webp"),
    },
  },
  96: {
    day: {
      description: "Light Thunderstorms With Hail",
      translationKey: "weather.condition.96.day",
      image: require("../../assets/conditions/g860.webp"),
    },
    night: {
      description: "Light Thunderstorms With Hail",
      translationKey: "weather.condition.96.night",
      image: require("../../assets/conditions/g860.webp"),
    },
  },
  99: {
    day: {
      description: "Thunderstorm With Hail",
      translationKey: "weather.condition.99.day",
      image: require("../../assets/conditions/g860.webp"),
    },
    night: {
      description: "Thunderstorm With Hail",
      translationKey: "weather.condition.99.night",
      image: require("../../assets/conditions/g860.webp"),
    },
  },
};
export default weatherDescriptions;
