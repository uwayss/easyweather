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
      image: require("../../assets/conditions/sunny.png"),
    },
    night: {
      description: "Clear",
      image: require("../../assets/conditions/sunny.png"),
    },
  },
  1: {
    day: {
      description: "Mainly Sunny",
      image: require("../../assets/conditions/sunny.png"),
    },
    night: {
      description: "Mainly Clear",
      image: require("../../assets/conditions/sunny.png"),
    },
  },
  2: {
    day: {
      description: "Partly Cloudy",
      image: require("../../assets/conditions/partly_cloudy.png"),
    },
    night: {
      description: "Partly Cloudy",
      image: require("../../assets/conditions/partly_cloudy.png"),
    },
  },
  3: {
    day: {
      description: "Cloudy",
      image: require("../../assets/conditions/cloudy.png"),
    },
    night: {
      description: "Cloudy",
      image: require("../../assets/conditions/cloudy.png"),
    },
  },
  45: {
    day: {
      description: "Foggy",
      image: require("../../assets/conditions/foggy.png"),
    },
    night: {
      description: "Foggy",
      image: require("../../assets/conditions/foggy.png"),
    },
  },
  48: {
    day: {
      description: "Rime Fog",
      image: require("../../assets/conditions/foggy.png"),
    },
    night: {
      description: "Rime Fog",
      image: require("../../assets/conditions/foggy.png"),
    },
  },
  51: {
    day: {
      description: "Light Drizzle",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
    night: {
      description: "Light Drizzle",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
  },
  53: {
    day: {
      description: "Drizzle",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
    night: {
      description: "Drizzle",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
  },
  55: {
    day: {
      description: "Heavy Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
    night: {
      description: "Heavy Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
  },
  56: {
    day: {
      description: "Light Freezing Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
    night: {
      description: "Light Freezing Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
  },
  57: {
    day: {
      description: "Freezing Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
    night: {
      description: "Freezing Drizzle",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
  },
  61: {
    day: {
      description: "Light Rain",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
    night: {
      description: "Light Rain",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
  },
  63: {
    day: {
      description: "Rain",
      image: require("../../assets/conditions/g2376.png"),
    },
    night: {
      description: "Rain",
      image: require("../../assets/conditions/g2376.png"),
    },
  },
  65: {
    day: {
      description: "Heavy Rain",
      image: require("../../assets/conditions/g2376.png"),
    },
    night: {
      description: "Heavy Rain",
      image: require("../../assets/conditions/g2376.png"),
    },
  },
  66: {
    day: {
      description: "Light Freezing Rain",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
    night: {
      description: "Light Freezing Rain",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
  },
  67: {
    day: {
      description: "Freezing Rain",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
    night: {
      description: "Freezing Rain",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
  },
  71: {
    day: {
      description: "Light Snow",
      image: require("../../assets/conditions/g1800.png"),
    },
    night: {
      description: "Light Snow",
      image: require("../../assets/conditions/g1800.png"),
    },
  },
  73: {
    day: {
      description: "Snow",
      image: require("../../assets/conditions/g2376.png"),
    },
    night: {
      description: "Snow",
      image: require("../../assets/conditions/g2376.png"),
    },
  },
  75: {
    day: {
      description: "Heavy Snow",
      image: require("../../assets/conditions/g2376.png"),
    },
    night: {
      description: "Heavy Snow",
      image: require("../../assets/conditions/g2376.png"),
    },
  },
  77: {
    day: {
      description: "Snow Grains",
      image: require("../../assets/conditions/g1800.png"),
    },
    night: {
      description: "Snow Grains",
      image: require("../../assets/conditions/g1800.png"),
    },
  },
  80: {
    day: {
      description: "Light Showers",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
    night: {
      description: "Light Showers",
      image: require("../../assets/conditions/light_drizzle.png"),
    },
  },
  81: {
    day: {
      description: "Showers",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
    night: {
      description: "Showers",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
  },
  82: {
    day: {
      description: "Heavy Showers",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
    night: {
      description: "Heavy Showers",
      image: require("../../assets/conditions/heavy_drizzle.png"),
    },
  },
  85: {
    day: {
      description: "Light Snow Showers",
      image: require("../../assets/conditions/g1800.png"),
    },
    night: {
      description: "Light Snow Showers",
      image: require("../../assets/conditions/g1800.png"),
    },
  },
  86: {
    day: {
      description: "Snow Showers",
      image: require("../../assets/conditions/g2376.png"),
    },
    night: {
      description: "Snow Showers",
      image: require("../../assets/conditions/g2376.png"),
    },
  },
  95: {
    day: {
      description: "Thunderstorm",
      image: require("../../assets/conditions/g860.png"),
    },
    night: {
      description: "Thunderstorm",
      image: require("../../assets/conditions/g860.png"),
    },
  },
  96: {
    day: {
      description: "Light Thunderstorms With Hail",
      image: require("../../assets/conditions/g860.png"),
    },
    night: {
      description: "Light Thunderstorms With Hail",
      image: require("../../assets/conditions/g860.png"),
    },
  },
  99: {
    day: {
      description: "Thunderstorm With Hail",
      image: require("../../assets/conditions/g860.png"),
    },
    night: {
      description: "Thunderstorm With Hail",
      image: require("../../assets/conditions/g860.png"),
    },
  },
};
export default weatherDescriptions;
