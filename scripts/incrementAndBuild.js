// scripts/incrementAndBuild.js
import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";

const VERSION_CODE_FILE = "versionCode.txt";

function getNextVersionCode() {
  let currentVersionCode = 0;
  if (existsSync(VERSION_CODE_FILE)) {
    try {
      currentVersionCode = parseInt(
        readFileSync(VERSION_CODE_FILE, "utf-8").trim(),
        10
      );
      if (isNaN(currentVersionCode)) {
        console.warn(
          `Warning: ${VERSION_CODE_FILE} contains invalid number. Resetting to 0.`
        );
        currentVersionCode = 0;
      }
    } catch (error) {
      console.error(`Error reading ${VERSION_CODE_FILE}: ${error.message}`);
      currentVersionCode = 0;
    }
  }

  const nextVersionCode = currentVersionCode + 1;
  writeFileSync(VERSION_CODE_FILE, nextVersionCode.toString(), "utf-8");
  console.log(
    `Version code incremented from ${currentVersionCode} to ${nextVersionCode}`
  );
  return nextVersionCode;
}

async function main() {
  console.log("Starting local build preparation...");

  // 1. Get and increment the version code
  const newVersionCode = getNextVersionCode();

  // 2. Run expo prebuild with the new version code as an environment variable
  console.log(`Running 'expo prebuild' with BUILD_NUMBER=${newVersionCode}...`);
  try {
    execSync(
      `BUILD_NUMBER=${newVersionCode} npx expo prebuild --platform android --clean`,
      { stdio: "inherit" }
    );
    console.log("Expo prebuild completed successfully!");
  } catch (error) {
    console.error(`Error during expo prebuild: ${error.message}`);
    console.error(
      "Please ensure you have Expo CLI installed globally (`npm install -g expo-cli` or `pnpm add -g expo-cli`) and Git is in your PATH."
    );
    process.exit(1);
  }

  // 3. Instruct the user on the next steps
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
