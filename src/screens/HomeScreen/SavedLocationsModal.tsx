// FILE: src/screens/HomeScreen/SavedLocationsModal.tsx
import Card from "@/src/components/Common/Card";
import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";
import {
  SavedLocation,
  useLocationContext,
} from "@/src/context/LocationContext";
import { useColorScheme } from "nativewind";
import React, { useEffect, useRef, useState } from "react"; // Added useState
import { useTranslation } from "react-i18next";
import {
  Animated,
  BackHandler,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface SavedLocationsModalProps {
  visible: boolean;
  onClose: () => void;
}

const SavedLocationsModal: React.FC<SavedLocationsModalProps> = ({
  visible,
  onClose,
}) => {
  const {
    savedLocations,
    setActiveLocation,
    removeSavedLocation,
    addSavedLocation,
    isLocationSaved,
    location: activeLocation,
  } = useLocationContext();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [modalRendered, setModalRendered] = useState(false); // State to control rendering

  useEffect(() => {
    if (visible) {
      setModalRendered(true); // Make it rendered before animating in
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setModalRendered(false); // Unrender after animating out
      });
    }

    const backAction = () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [visible, animatedValue, onClose]);

  const backdropAnimatedStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const modalAnimatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [50, 20, 0],
        }),
      },
    ],
  };

  const handleSelectLocation = (selectedLoc: SavedLocation) => {
    setActiveLocation(selectedLoc);
    onClose();
  };

  const handleDeleteLocation = (locationId: string) => {
    removeSavedLocation(locationId);
  };

  const handleAddCurrentLocation = () => {
    if (activeLocation && !isLocationSaved(activeLocation)) {
      addSavedLocation(activeLocation);
    }
  };

  const renderItem = ({ item }: { item: SavedLocation }) => (
    <View className="flex-row items-center justify-between py-3.5 px-4 border-b border-light-outline/20 dark:border-dark-outline/20">
      <Text className="flex-1 text-base mr-3" numberOfLines={2}>
        {item.displayName}
      </Text>
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => handleSelectLocation(item)}
          className="py-1.5 px-3 bg-light-primary/10 dark:bg-dark-primary/10 rounded-md mr-2"
        >
          <Text className="text-light-primary dark:text-dark-primary font-medium text-sm">
            {t("location.view")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteLocation(item.id)}
          className="p-1.5"
        >
          <Icon
            name="trash-can-outline"
            size={22}
            color={colorScheme === "dark" ? "#FF8A80" : "#D32F2F"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const isCurrentActiveLocationSavable =
    activeLocation &&
    !isLocationSaved(activeLocation) &&
    activeLocation.displayName !== t("weather.current_location") &&
    activeLocation.displayName !== t("weather.loading_location") &&
    activeLocation.displayName !== t("weather.unknown_location");

  if (!modalRendered) {
    return null;
  }

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={visible ? "auto" : "none"}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
      </TouchableWithoutFeedback>

      <View style={styles.centeredView} pointerEvents="box-none">
        <Animated.View
          style={[styles.modalContentContainer, modalAnimatedStyle]}
        >
          <Card elevated className="overflow-hidden max-h-[75vh] w-full">
            <View className="flex-row items-center justify-between p-4 border-b border-light-outline dark:border-dark-outline">
              <Text className="text-xl font-semibold">
                {t("location.saved_locations")}
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="p-1 rounded-full active:bg-black/10 dark:active:bg-white/10"
              >
                <Icon name="close" size={24} />
              </TouchableOpacity>
            </View>

            {isCurrentActiveLocationSavable && (
              <TouchableOpacity
                onPress={handleAddCurrentLocation}
                className="py-3 px-4 m-4 bg-light-primary dark:bg-dark-primary rounded-lg items-center shadow-md active:opacity-80"
              >
                <Text className="text-white dark:text-black font-semibold text-center text-sm">
                  {t("location.add_current")}:{" "}
                  {activeLocation?.displayName.length > 20
                    ? activeLocation?.displayName.substring(0, 20) + "..."
                    : activeLocation?.displayName}
                </Text>
              </TouchableOpacity>
            )}

            {savedLocations.length > 0 ? (
              <FlatList
                data={savedLocations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  paddingBottom: Platform.OS === "ios" ? 20 : 10,
                }}
              />
            ) : (
              <View className="py-10 px-4 items-center justify-center flex-1 min-h-[150px]">
                <Icon
                  name="map-marker-multiple-outline"
                  size={48}
                  className="opacity-40 mb-3"
                />
                <Text className="text-lg opacity-60 text-center">
                  {t("location.no_saved_locations")}
                </Text>
              </View>
            )}
          </Card>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContentContainer: {
    width: "100%",
    maxWidth: 450,
  },
});

export default SavedLocationsModal;
