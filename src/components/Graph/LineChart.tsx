// FILE: src/components/Graph/LineChart.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native"; // Import core Text
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg";
// Removed Text import from paper
import { GraphDataPoint } from "../../utils/metricData";
import { useColorScheme } from "nativewind"; // Need this for theme colors

interface LineChartProps {
  // ... props remain the same
  data: GraphDataPoint[];
  height: number;
  width: number;
  itemWidth: number;
  lineColor?: string;
  lineWidth?: number;
  showPoints?: boolean;
  pointColor?: string;
  pointRadius?: number;
  showGradient?: boolean;
  gradientColor?: string;
  paddingVertical?: number;
}
const LineChart: React.FC<LineChartProps> = ({
  data,
  height,
  width,
  itemWidth,
  lineColor: propLineColor,
  lineWidth = 1.5,
  showPoints = true,
  pointRadius = 5,
  showGradient = true,
  gradientColor: propGradientColor,
  paddingVertical = 5,
}) => {
  const { colorScheme } = useColorScheme(); // Get color scheme
  // Use Tailwind theme colors
  const themeColors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  const lineColor = propLineColor || themeColors.primary;
  const gradientColor = propGradientColor || lineColor;

  if (!data || data.length < 2) {
    return (
      <View style={[{ height, width }, styles.centerContent]}>
        {/* Use core Text with Tailwind classes */}
        <Text className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
          Not enough data
        </Text>
      </View>
    );
  }

  // ... rest of the component logic remains the same

  // Calculate Y based on chartHeight and bottom padding
  const chartHeight = height - paddingVertical * 2;
  const calculateY = (progress: number) => paddingVertical + chartHeight * (1 - progress);

  const points = data.map((point: GraphDataPoint, index: number) => ({
    x: index * itemWidth + itemWidth / 2,
    y: calculateY(point.progress),
    fill: point.color || themeColors.primary, // Use theme color
  }));

  let linePath = "";
  if (points.length >= 2) {
    linePath = `M ${points[0].x} ${points[0].y}`;
    points.forEach((p, index: number) => {
      if (index > 0) {
        linePath += ` L ${p.x} ${p.y}`;
      }
    });
  }

  let gradientPath = "";
  if (showGradient && points.length >= 1) {
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    const bottomY = paddingVertical + chartHeight;

    if (points.length >= 2) {
      gradientPath = linePath + ` L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
    } else {
      const pointY = points[0].y;
      const gradientBaseWidth = Math.min(itemWidth / 2, 10);
      gradientPath = `M ${firstX - gradientBaseWidth / 2} ${bottomY} L ${
        firstX + gradientBaseWidth / 2
      } ${bottomY} L ${firstX} ${pointY} Z`;
    }
  }

  return (
    <Svg height={height} width={width}>
      {showGradient && gradientPath && (
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={gradientColor} stopOpacity="0.3" />
            <Stop offset="1" stopColor={gradientColor} stopOpacity="0" />
          </LinearGradient>
        </Defs>
      )}
      {showGradient && gradientPath && <Path d={gradientPath} fill="url(#grad)" />}
      {linePath && (
        <Path
          d={linePath}
          stroke={lineColor}
          strokeWidth={lineWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {showPoints &&
        points.map((p, index: number) => (
          <Circle key={`point-${index}`} cx={p.x} cy={p.y} r={pointRadius} fill={p.fill} />
        ))}
    </Svg>
  );
};

// Temporary color objects (could centralize these later)
const lightThemeColors = { primary: "#006d77", onSurfaceVariant: "#666666" };
const darkThemeColors = { primary: "#83c5be", onSurfaceVariant: "#aaaaaa" };

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LineChart;
