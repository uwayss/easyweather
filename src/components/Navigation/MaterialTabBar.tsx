// FILE: src/components/Navigation/MaterialTabBar.tsx
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutChangeEvent, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";
import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "@/src/constants/colors";

// Map route names to icons
const ICONS: Record<string, string> = {
  index: "home-outline",
  locations: "bookmark-multiple-outline",
  settings: "cog-outline",
};

// Map route names to translation keys for labels
const LABELS: Record<string, string> = {
  index: "common.home",
  locations: "location.saved_locations_short",
  settings: "settings.title",
};

export function MaterialTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? THEME_COLORS_DARK : THEME_COLORS_LIGHT;
  const { bottom } = useSafeAreaInsets();

  const [pressableLayouts, setPressableLayouts] = useState<
    Record<string, { x: number; width: number }>
  >({});
  const [contentLayouts, setContentLayouts] = useState<
    Record<string, { width: number }>
  >({});

  const onLayoutPressable = (event: LayoutChangeEvent, key: string) => {
    const { x, width } = event.nativeEvent.layout;
    if (
      pressableLayouts[key]?.x !== x ||
      pressableLayouts[key]?.width !== width
    ) {
      setPressableLayouts((prev) => ({ ...prev, [key]: { x, width } }));
    }
  };

  const onLayoutContent = (event: LayoutChangeEvent, key: string) => {
    const { width } = event.nativeEvent.layout;
    if (contentLayouts[key]?.width !== width) {
      setContentLayouts((prev) => ({ ...prev, [key]: { width } }));
    }
  };

  const pillX = useSharedValue(0);
  const pillWidth = useSharedValue(0);

  useEffect(() => {
    const activeRouteKey = state.routes[state.index].key;
    const pressableLayout = pressableLayouts[activeRouteKey];
    const contentLayout = contentLayouts[activeRouteKey];

    if (pressableLayout && contentLayout) {
      const contentWidth = contentLayout.width;
      const pillTargetX =
        pressableLayout.x + (pressableLayout.width - contentWidth) / 2;

      pillX.value = withSpring(pillTargetX, { damping: 15, stiffness: 120 });
      pillWidth.value = withSpring(contentWidth, {
        damping: 15,
        stiffness: 120,
      });
    }
  }, [
    state.index,
    pressableLayouts,
    contentLayouts,
    pillX,
    pillWidth,
    state.routes,
  ]);

  const animatedPillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: pillX.value }],
      width: pillWidth.value,
    };
  });

  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: bottom,
        height: 80 + bottom,
        backgroundColor:
          colorScheme === "dark" ? colors.elevation.level2 : colors.background,
        borderTopColor: colors.outline,
        borderTopWidth: 0.5,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 24,
            height: 32,
            borderRadius: 16,
            backgroundColor: `${colors.primary}2A`,
          },
          animatedPillStyle,
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const iconName = ICONS[route.name] || "help-circle-outline";
        const labelKey = LABELS[route.name] || "common.home";

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={(options as any).tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            onLayout={(e) => onLayoutPressable(e, route.key)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              onLayout={(e) => onLayoutContent(e, route.key)}
              style={{
                paddingHorizontal: isFocused ? 16 : 12,
                paddingVertical: 4,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon
                name={iconName}
                size={22}
                color={isFocused ? colors.primary : colors.onSurfaceVariant}
              />
              {isFocused && (
                <Text
                  pop
                  className="font-semibold text-xs text-light-primary dark:text-dark-primary"
                >
                  {t(labelKey)}
                </Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
