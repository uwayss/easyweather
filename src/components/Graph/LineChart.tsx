// FILE: src/components/Graph/LineChart.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { useTheme, Text as PaperText } from "react-native-paper";
import { GraphDataPoint } from "../../utils/metricData";

interface LineChartProps {
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
  // paddingHorizontal?: number; // REMOVED: No longer used for point positioning
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
  // paddingHorizontal = 15, // REMOVED
  paddingVertical = 5,
}) => {
  const theme = useTheme();

  // Line color defaults to theme.colors.primary if not provided
  const lineColor = propLineColor || theme.colors.primary;
  // Gradient color defaults to the lineColor (which defaults to primary)
  const gradientColor = propGradientColor || lineColor;
  const labelColor = theme.colors.onSurfaceVariant;

  if (!data || data.length < 2) {
    // ... (error handling remains the same)
    return (
      <View style={[styles.container, { height, width }, styles.centerContent]}>
        <PaperText style={{ color: labelColor }}>Not enough data</PaperText>
      </View>
    );
  }
  if (data.length < 2 && showPoints) {
    // Handle case with only one data point - render just the point
    // (or decide if you want to render nothing/placeholder)
  }

  // Use the provided padding directly for vertical calculations
  const chartHeight = height - paddingVertical * 2;
  // const chartWidth = width - paddingHorizontal * 2; // REMOVED - width is the total SVG width
  // const numDataPoints = data.length; // Already available
  // const xStep = numDataPoints > 1 ? chartWidth / (numDataPoints - 1) : chartWidth; // REMOVED - using itemWidth now

  // Calculate Y based on chartHeight and bottom padding
  const calculateY = (progress: number) => paddingVertical + chartHeight * (1 - progress);

  // --- Point Coordinates Calculation (Using itemWidth) ---
  const points = data.map((point: GraphDataPoint, index: number) => ({
    x: index * itemWidth + itemWidth / 2, // Center point in the item column
    y: calculateY(point.progress),
    fill: point.color || theme.colors.primary, // Use point's color or default
  }));

  // --- Path Calculations (Using new point coordinates) ---
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
    // Allow gradient even for 1 point (though it might look odd)
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    const bottomY = paddingVertical + chartHeight;

    if (points.length >= 2) {
      // Start path from first point, go along line, then down to bottom corners
      gradientPath = linePath + ` L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
    } else {
      // Handle gradient for a single point (e.g., a small vertical line/area)
      const pointY = points[0].y;
      // Create a small base for the gradient centered under the point
      const gradientBaseWidth = Math.min(itemWidth / 2, 10); // Adjust width as needed
      gradientPath = `M ${firstX - gradientBaseWidth / 2} ${bottomY} L ${
        firstX + gradientBaseWidth / 2
      } ${bottomY} L ${firstX} ${pointY} Z`;
    }
  }

  // --- Render ---
  return (
    <Svg height={height} width={width}>
      {showGradient &&
        gradientPath && ( // Check if gradientPath is generated
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={gradientColor} stopOpacity="0.3" />
              <Stop offset="1" stopColor={gradientColor} stopOpacity="0" />
            </LinearGradient>
          </Defs>
        )}
      {showGradient && gradientPath && <Path d={gradientPath} fill="url(#grad)" />}
      {linePath && ( // Check if linePath is generated (>= 2 points)
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

const styles = StyleSheet.create({
  container: {},
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LineChart;
