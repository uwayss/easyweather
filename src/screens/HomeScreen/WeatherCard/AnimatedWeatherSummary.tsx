// FILE: src/screens/HomeScreen/WeatherCard/AnimatedWeatherSummary.tsx
import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";

interface AnimatedWeatherSummaryProps {
  label: string | null;
}

const AnimatedWeatherSummary: React.FC<AnimatedWeatherSummaryProps> = ({
  label,
}) => {
  // Lazy state initialiser rather than useRef(...).current: reading a ref
  // during render is what react-hooks/refs flags, and this also avoids
  // constructing a throwaway Animated.Value on every render.
  const [animatedValue] = useState(() => new Animated.Value(0));
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (label) {
      // The card has to be mounted before it can animate in, and it stays
      // mounted through the exit animation (unmounted from the completion
      // callback below). Deriving this during render instead would drop the
      // element immediately and lose the fade-out.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRendered(true);
      Animated.sequence([
        Animated.spring(animatedValue, {
          toValue: 1,
          friction: 7,
          tension: 40,
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
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
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
        <Card className="py-1.5 px-3" elevated>
          <Text className="text-xs text-center leading-snug" pop>
            {label}
          </Text>
        </Card>
      )}
    </Animated.View>
  );
};

export default React.memo(AnimatedWeatherSummary);
