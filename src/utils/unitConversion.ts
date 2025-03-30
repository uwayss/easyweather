/**
 * Utility functions for unit conversions
 */

/**
 * Converts temperature based on user preference
 * @param tempCelsius Temperature in Celsius
 * @param useImperial Whether to convert to Fahrenheit
 * @returns Temperature in the preferred unit
 */
export function convertTemperature(tempCelsius: number, useImperial: boolean): number {
  if (useImperial) {
    // Convert to Fahrenheit: (C × 9/5) + 32
    return (tempCelsius * 9) / 5 + 32;
  }
  // Return as Celsius
  return tempCelsius;
}

/**
 * Formats temperature with the appropriate unit symbol
 * @param temp Temperature value (already converted to preferred unit)
 * @param useImperial Whether to use Fahrenheit symbol
 * @returns Formatted temperature string with unit symbol
 */
export function formatTemperature(temp: number, useImperial: boolean): string {
  const roundedTemp = Math.round(temp);
  return `${roundedTemp}°${useImperial ? "F" : "C"}`;
}

/**
 * Converts wind speed based on user preference
 * @param speedKmh Wind speed in km/h
 * @param useImperial Whether to convert to mph
 * @returns Wind speed in the preferred unit
 */
export function convertWindSpeed(speedKmh: number, useImperial: boolean): number {
  if (useImperial) {
    // Convert to mph: km/h ÷ 1.60934
    return speedKmh / 1.60934;
  }
  // Return as km/h
  return speedKmh;
}

/**
 * Formats wind speed with the appropriate unit
 * @param speed Wind speed value (already converted to preferred unit)
 * @param useImperial Whether to use mph
 * @returns Formatted wind speed string with unit
 */
export function formatWindSpeed(speed: number, useImperial: boolean): string {
  // Make sure to round the speed to the nearest integer
  const roundedSpeed = Math.round(speed);
  return `${roundedSpeed} ${useImperial ? "mph" : "km/h"}`;
}
