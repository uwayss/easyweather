import { useColorScheme } from "nativewind";
import React from "react";
import { View, Text } from "react-native";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../../constants/colors";
import { GraphDataPoint } from "../../utils/metricData";

interface LineChartProps {
  data: GraphDataPoint[];
  height: number;
  width: number;
  itemWidth: number;
  lineColor?: string;
  lineWidth?: number;
  showPoints?: boolean;
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
  const { colorScheme } = useColorScheme();
  const themeColors =
    colorScheme === "dark" ? THEME_COLORS_DARK : THEME_COLORS_LIGHT;

  const lineColor = propLineColor || themeColors.primary;
  const gradientColor = propGradientColor || lineColor;

  if (!data || data.length < 2) {
    return (
      <View style={{ height, width }} className="justify-center items-center">
        <Text className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
          Not enough data
        </Text>
      </View>
    );
  }

  const chartHeight = height - paddingVertical * 2;
  const calculateY = (progress: number) =>
    paddingVertical + chartHeight * (1 - progress);

  const points = data.map((point: GraphDataPoint, index: number) => ({
    x: index * itemWidth + itemWidth / 2,
    y: calculateY(point.progress),
    fill: point.color || themeColors.primary,
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
      gradientPath =
        linePath + ` L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
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
      {showGradient && gradientPath && (
        <Path d={gradientPath} fill="url(#grad)" />
      )}
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
          <Circle
            key={`point-${index}`}
            cx={p.x}
            cy={p.y}
            r={pointRadius}
            fill={p.fill}
          />
        ))}
    </Svg>
  );
};

export default LineChart;
