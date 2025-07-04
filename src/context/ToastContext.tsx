import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "../components/Icon";
import Text from "../components/Common/Text";

type ToastType = "success" | "error" | "info";

interface ToastConfig {
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (config: ToastConfig) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

const TOAST_CONFIG = {
  success: {
    icon: "check-circle",
    iconColor: "#4CAF50",
    bg: "bg-green-100 dark:bg-green-900",
    border: "border-green-400 dark:border-green-600",
  },
  error: {
    icon: "alert-circle",
    iconColor: "#F44336",
    bg: "bg-red-100 dark:bg-red-900",
    border: "border-red-400 dark:border-red-600",
  },
  info: {
    icon: "information",
    iconColor: "#2196F3",
    bg: "bg-blue-100 dark:bg-blue-900",
    border: "border-blue-400 dark:border-blue-600",
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const insets = useSafeAreaInsets();
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const hideToast = useCallback(() => {
    translateY.value = withTiming(100, { duration: 250 });
    opacity.value = withTiming(0, { duration: 250 }, (isFinished) => {
      if (isFinished) {
        runOnJS(setToastConfig)(null);
      }
    });
  }, [opacity, translateY]);

  const showToast = useCallback(
    ({ message, type }: ToastConfig) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setToastConfig({ message, type });
      translateY.value = withSpring(0, { damping: 15, stiffness: 120 });
      opacity.value = withTiming(1, { duration: 200 });

      timeoutRef.current = setTimeout(hideToast, 4000);
    },
    [hideToast, opacity, translateY]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastConfig && (
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: insets.bottom || 10,
              left: 16,
              right: 16,
              zIndex: 9999,
            },
            animatedStyle,
          ]}
        >
          <View
            className={`flex-row items-center p-3 rounded-lg border-l-4 shadow-lg ${
              TOAST_CONFIG[toastConfig.type].bg
            } ${TOAST_CONFIG[toastConfig.type].border}`}
          >
            <Icon
              name={TOAST_CONFIG[toastConfig.type].icon}
              size={24}
              color={TOAST_CONFIG[toastConfig.type].iconColor}
            />
            <Text className="ml-3 flex-1 text-base">{toastConfig.message}</Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
