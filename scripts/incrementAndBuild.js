import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

const APP_JSON_PATH = "app.json";

function incrementAndGetVersionCode() {
  const configFile = readFileSync(APP_JSON_PATH, "utf-8");
  const config = JSON.parse(configFile);

  const currentVersionCode = config.expo.android.versionCode || 0;
  const nextVersionCode = currentVersionCode + 1;
  config.expo.android.versionCode = nextVersionCode;

  writeFileSync(APP_JSON_PATH, JSON.stringify(config, null, 2), "utf-8");
  console.log(
    `Version code in ${APP_JSON_PATH} incremented from ${currentVersionCode} to ${nextVersionCode}`
  );
  return nextVersionCode;
}

async function main() {
  console.log("Starting local build preparation...");
  const newVersionCode = incrementAndGetVersionCode();

  console.log(`Running 'expo prebuild'...`);
  try {
    execSync(`npx expo prebuild --platform android --clean`, {
      stdio: "inherit",
    });
    console.log("Expo prebuild completed successfully!");
  } catch (error) {
    console.error(`Error during expo prebuild: ${error.message}`);
    console.error(
      "Please ensure you have Expo CLI installed and Git is in your PATH."
    );
    process.exit(1);
  }

  console.log(
    `\n---------------------------------------------------------------------`
  );
  console.log(
    `SUCCESS! Your Android native project has been updated with versionCode: ${newVersionCode}.`
  );
  console.log(`Now, proceed to build your .aab bundle:`);
  console.log(
    `---------------------------------------------------------------------`
  );
}

main();
