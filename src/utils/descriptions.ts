/* eslint-disable @typescript-eslint/no-require-imports */
import { ImageSourcePropType } from "react-native";

interface weatherDescriptionsType {
  [code: number]: {
    day: { description: string; image: ImageSourcePropType };
    night: { description: string; image: ImageSourcePropType };
  };
}
const weatherDescriptions: weatherDescriptionsType = {
  0: {
    day: {
      description: "Sunny",
      image: require("../../assets/conditions/sunny.webp"),
    },
    night: {
      description: "Clear",
      image: require("../../assets/conditions/sunny.webp"),
    },
  },
  1: {
    day: {
      description: "Mainly Sunny",
      image: require("../../assets/conditions/sunny.webp"),
    },
    night: {
      description: "Mainly Clear",
      image: require("../../assets/conditions/sunny.webp"),
    },
  },
  2: {
    day: {
      description: "Partly Cloudy",
      image: require("../../assets/conditions/partly_cloudy.webp"),
    },
    night: {
      description: "Partly Cloudy",
      image: require("../../assets/conditions/partly_cloudy.webp"),
    },
  },
  3: {
    day: {
      description: "Cloudy",
      image: require("../../assets/conditions/cloudy.webp"),
    },
    night: {
      description: "Cloudy",
      image: require("../../assets/conditions/cloudy.webp"),
    },
  },
  45: {
    day: {
      description: "Foggy",
      image: require("../../assets/conditions/foggy.webp"),
    },
    night: {
      description: "Foggy",
      image: require("../../assets/conditions/foggy.webp"),
    },
  },
  48: {
    day: {
      description: "Rime Fog",
      image: require("../../assets/conditions/foggy.webp"),
    },
    night: {
      description: "Rime Fog",
      image: require("../../assets/conditions/foggy.webp"),
    },
  },
  51: {
    day: {
      description: "Light Drizzle",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Light Drizzle",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
  },
  53: {
    day: {
      description: "Drizzle",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Drizzle",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
  },
  55: {
    day: {
      description: "Heavy Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Heavy Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },
  56: {
    day: {
      description: "Light Freezing Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Light Freezing Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },
  57: {
    day: {
      description: "Freezing Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Freezing Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },
  61: {
    day: {
      description: "Light Rain",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Light Rain",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
  },
  63: {
    day: {
      description: "Rain",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Rain",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },
  65: {
    day: {
      description: "Heavy Rain",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Heavy Rain",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },
  66: {
    day: {
      description: "Light Freezing Rain",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Light Freezing Rain",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
  },
  67: {
    day: {
      description: "Freezing Rain",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Freezing Rain",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },
  71: {
    day: {
      description: "Light Snow",
      image: require("../../assets/conditions/g1800.webp"),
    },
    night: {
      description: "Light Snow",
      image: require("../../assets/conditions/g1800.webp"),
    },
  },
  73: {
    day: {
      description: "Snow",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Snow",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },
  75: {
    day: {
      description: "Heavy Snow",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Heavy Snow",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },
  77: {
    day: {
      description: "Snow Grains",
      image: require("../../assets/conditions/g1800.webp"),
    },
    night: {
      description: "Snow Grains",
      image: require("../../assets/conditions/g1800.webp"),
    },
  },
  80: {
    day: {
      description: "Light Showers",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
    night: {
      description: "Light Showers",
      image: require("../../assets/conditions/light_drizzle.webp"),
    },
  },
  81: {
    day: {
      description: "Showers",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Showers",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },
  82: {
    day: {
      description: "Heavy Showers",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
    night: {
      description: "Heavy Showers",
      image: require("../../assets/conditions/heavy_drizzle.webp"),
    },
  },
  85: {
    day: {
      description: "Light Snow Showers",
      image: require("../../assets/conditions/g1800.webp"),
    },
    night: {
      description: "Light Snow Showers",
      image: require("../../assets/conditions/g1800.webp"),
    },
  },
  86: {
    day: {
      description: "Snow Showers",
      image: require("../../assets/conditions/g2376.webp"),
    },
    night: {
      description: "Snow Showers",
      image: require("../../assets/conditions/g2376.webp"),
    },
  },
  95: {
    day: {
      description: "Thunderstorm",
      image: require("../../assets/conditions/g860.webp"),
    },
    night: {
      description: "Thunderstorm",
      image: require("../../assets/conditions/g860.webp"),
    },
  },
  96: {
    day: {
      description: "Light Thunderstorms With Hail",
      image: require("../../assets/conditions/g860.webp"),
    },
    night: {
      description: "Light Thunderstorms With Hail",
      image: require("../../assets/conditions/g860.webp"),
    },
  },
  99: {
    day: {
      description: "Thunderstorm With Hail",
      image: require("../../assets/conditions/g860.webp"),
    },
    night: {
      description: "Thunderstorm With Hail",
      image: require("../../assets/conditions/g860.webp"),
    },
  },
};
export default weatherDescriptions;
