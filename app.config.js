import config from "./app.json";

export default ({ config: defaultConfig }) => {
  const finalConfig = {
    ...defaultConfig,
    ...config,
    expo: {
      ...defaultConfig.expo,
      ...config.expo,
    },
  };

  finalConfig.expo.android.networkSecurityConfig = {
    "domain-config": [
      {
        cleartextTrafficPermitted: true,
        domain: "ip-api.com",
      },
    ],
  };

  return finalConfig;
};
