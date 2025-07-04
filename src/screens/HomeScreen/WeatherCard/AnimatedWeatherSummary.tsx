// FILE: src/screens/HomeScreen/WeatherCard/AnimatedWeatherSummary.tsx
import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";

interface AnimatedWeatherSummaryProps {
  label: string | null;
}

const AnimatedWeatherSummary: React.FC<AnimatedWeatherSummaryProps> = ({
  label,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (label) {
      setIsRendered(true);
      Animated.sequence([
        Animated.delay(500), // 1.5 second delay
        Animated.spring(animatedValue, {
          toValue: 1,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsRendered(false);
      });
    }
  }, [label, animatedValue]);

  const containerStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.97, 1],
        }),
      },
    ],
  };

  if (!isRendered && !label) {
    return null;
  }

  return (
    <Animated.View style={containerStyle}>
      {isRendered && label && (
        <Card className="py-1.5 px-3 mt-2" elevated>
          <Text className="text-xs text-center leading-snug" pop passive>
            {label}
          </Text>
        </Card>
      )}
    </Animated.View>
  );
};

export default React.memo(AnimatedWeatherSummary);
