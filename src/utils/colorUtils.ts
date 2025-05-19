// FILE: src/utils/colorUtils.ts
import { TEMP_COLOR_STOPS_CELSIUS } from "../constants/colors";

/**
 * Color utility functions for the weather app
 */

/**
 * Converts a hex color string to RGB values
 * @param hex - Hex color string (e.g. "#ff0000")
 * @returns RGB color object or null if invalid hex
 */
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB values to a hex color string
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/**
 * Interpolates between two colors based on a progress value
 * @param color1 - Starting hex color
 * @param color2 - Ending hex color
 * @param progress - Progress between the two colors (0-1)
 * @returns Interpolated hex color
 */
export function interpolateColor(
  color1: string,
  color2: string,
  progress: number
): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return color1;
  }

  progress = Math.max(0, Math.min(1, progress));

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * progress);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * progress);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * progress);

  return rgbToHex(r, g, b);
}

/**
 * Gets a color from a gradient based on temperature value
 * @param temperature - The temperature value (assumed to be in Celsius for this default gradient)
 * @param minTemp - Minimum temperature in the range (Celsius)
 * @param maxTemp - Maximum temperature in the range (Celsius)
 * @param colorStops - Array of [temperature, color] pairs defining the gradient (Celsius)
 * @returns Hex color string
 */
export function getTemperatureGradientColor(
  temperature: number,
  minTemp: number,
  maxTemp: number,
  colorStops: [number, string][] = TEMP_COLOR_STOPS_CELSIUS
): string {
  const sortedStops = [...colorStops].sort((a, b) => a[0] - b[0]);

  const clampedTemp = Math.max(minTemp, Math.min(maxTemp, temperature));

  if (clampedTemp <= sortedStops[0][0]) {
    return sortedStops[0][1];
  }

  if (clampedTemp >= sortedStops[sortedStops.length - 1][0]) {
    return sortedStops[sortedStops.length - 1][1];
  }

  for (let i = 0; i < sortedStops.length - 1; i++) {
    const [temp1, color1] = sortedStops[i];
    const [temp2, color2] = sortedStops[i + 1];

    if (clampedTemp >= temp1 && clampedTemp <= temp2) {
      const progress = (clampedTemp - temp1) / (temp2 - temp1);

      return interpolateColor(color1, color2, progress);
    }
  }

  return sortedStops[0][1];
}
