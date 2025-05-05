#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
var os = require("os");
var path = require("path");

var chalk = require("chalk");
var execa = require("execa");
var fs = require("fs-extra");
var argv = require("minimist")(process.argv.slice(2));
var open = require("open");
var explore = require("source-map-explorer").explore;
var pkgJSON = JSON.parse(fs.readFileSync("./package.json"));
function sanitizeString(str) {
    return str ? str.replace(/[^\w]/gi, "") : str;
}
function getAppName() {
    if (pkgJSON.name)
        return sanitizeString(pkgJSON.name);
    try {
        var appJSON = JSON.parse(fs.readFileSync("./app.json"));
        return sanitizeString(appJSON.name) || sanitizeString(appJSON.expo.name) || "UnknownApp";
    }
    catch {
        return "UnknownApp";
    }
}
function getEntryPoint() {
    var entry = pkgJSON.main || "index.js";
    if (entry[0] !== "." && entry[0] !== "/" && entry[0] !== "\\") {
        entry = "./" + entry;
    }
    return entry;
}
function getReactNativeBin() {
    var localBin = "./node_modules/.bin/react-native";
    if (fs.existsSync(localBin))
        return localBin;
    try {
        var reactNativeDir = path.dirname(require.resolve("react-native/package.json"));
        return path.join(reactNativeDir, "./cli.js");
    }
    catch  {
        console.error(chalk.red.bold("React-native binary could not be located. Please report this issue with environment info to:\n"), chalk.blue.bold("-> ".concat(require("../package.json").bugs)));
    }
}
var baseDir = path.join(os.tmpdir(), "react-native-bundle-visualizer");
var tmpDir = path.join(baseDir, getAppName());
var outDir = path.join(tmpDir, "output");
var entryFile = argv["entry-file"] || getEntryPoint();
var platform = argv.platform || "ios";
var isExpo = argv.expo || false;
var dev = argv.dev || false;
var verbose = argv.verbose || false;
var resetCache = argv["reset-cache"] || false;
var bundleOutput = argv["bundle-output"] || path.join(tmpDir, platform + ".bundle");
var bundleOutputSourceMap = bundleOutput + ".map";
var format = argv.format || "html";
var bundleOutputExplorerFile = path.join(outDir, "explorer." + format);
var onlyMapped = !!argv["only-mapped"] || false;
var borderChecks = argv["border-checks"] || false;
fs.ensureDirSync(baseDir);
fs.ensureDirSync(tmpDir);
var prevBundleSize;
if (fs.existsSync(bundleOutput)) {
    var stats = fs.statSync(bundleOutput);
    prevBundleSize = stats.size;
}
console.log(chalk.green.bold("Generating bundle..."));
var commands = [
    "bundle",
    "--platform",
    platform,
    "--dev",
    dev,
    "--entry-file",
    entryFile,
    "--bundle-output",
    bundleOutput,
    "--sourcemap-output",
    bundleOutputSourceMap,
    "--minify",
    isExpo,
];
if (resetCache) {
    commands.push("--reset-cache");
    commands.push(resetCache);
}
var reactNativeBin = getReactNativeBin();
var bundlePromise = execa(reactNativeBin, commands);
bundlePromise.stdout.pipe(process.stdout);
bundlePromise
    .then(function () {
    var stats = fs.statSync(bundleOutput);
    var deltaSuffix = "";
    if (prevBundleSize) {
        var delta = stats.size - prevBundleSize;
        if (delta > 0) {
            deltaSuffix = chalk.yellow(" (+++ has increased with " + delta + " bytes since last run)");
        }
        else if (delta < 0) {
            deltaSuffix = chalk.green.bold(" (--- has decreased with " + (0 - delta) + " bytes since last run)");
        }
        else {
            deltaSuffix = chalk.green(" (unchanged since last run)");
        }
    }
    console.log(chalk.green.bold("Bundle is " + Math.round((stats.size / (1024 * 1024)) * 100) / 100 + " MB in size") + deltaSuffix);
    fs.removeSync(outDir);
    return explore({
        code: bundleOutput,
        map: bundleOutputSourceMap,
    }, {
        onlyMapped: onlyMapped,
        noBorderChecks: borderChecks === false,
        output: {
            format: format,
            filename: bundleOutputExplorerFile,
        },
    });
})
    .then(function (result) {
    if (verbose) {
        result.bundles.forEach(function (bundle) {
            Object.keys(bundle.files).forEach(function (file) {
                console.log(chalk.green(file + ", size: " + bundle.files[file].size + " bytes"));
            });
        });
    }
    if (result.errors) {
        result.errors.forEach(function (error) {
            if (error.isWarning) {
                console.log(chalk.yellow.bold(error.message));
            }
            else {
                console.log(chalk.red.bold(error.message));
            }
        });
    }
    return open(bundleOutputExplorerFile);
})
    .catch(function (error) { return console.log(chalk.red("=== error ==="), error); });
