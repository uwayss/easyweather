// FILE: src/components/Common/BottomSheetModal.tsx
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "../Icon";
import Text from "./Text";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MODAL_MAX_HEIGHT_RATIO = 0.7;

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  children,
  title,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [internalModalVisible, setInternalModalVisible] =
    React.useState(visible);

  const slideUp = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 250, // Slightly faster animation
      useNativeDriver: true,
    }).start();
  };

  const slideDown = (callback?: () => void) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200, // Slightly faster animation
      useNativeDriver: true,
    }).start(() => {
      setInternalModalVisible(false);
      if (callback) callback(); // Original onClose
    });
  };

  const handleClose = () => {
    slideDown(onClose);
  };

  useEffect(() => {
    if (visible) {
      setInternalModalVisible(true);
      slideUp();
    } else if (internalModalVisible) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, internalModalVisible]);

  const modalAnimatedStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [SCREEN_HEIGHT, 0],
        }),
      },
    ],
  };

  if (!internalModalVisible && !visible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={internalModalVisible}
      onRequestClose={handleClose}
      animationType="none" // We handle animation manually
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.modalContainer, modalAnimatedStyle]}>
        <View className="w-12 h-1.5 bg-light-outline/70 dark:bg-dark-outline/70 rounded-full self-center my-2.5" />

        {title && (
          <View className="flex-row items-center justify-between px-4 pb-2 pt-0 border-b border-light-outline/30 dark:border-dark-outline/30 mb-2">
            <Text className="text-xl font-semibold">{title}</Text>
            <TouchableOpacity onPress={handleClose} className="p-2">
              <Icon name="close" size={22} />
            </TouchableOpacity>
          </View>
        )}
        {!title && (
          <TouchableOpacity
            onPress={handleClose}
            className="absolute top-3 right-3 p-2 z-10"
          >
            <Icon name="close" size={22} />
          </TouchableOpacity>
        )}

        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Slightly lighter backdrop
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16, // Standard border radius
    borderTopRightRadius: 16,
    maxHeight: SCREEN_HEIGHT * MODAL_MAX_HEIGHT_RATIO,
    paddingBottom: Platform.OS === "ios" ? 34 : 10, // SafeArea for iOS, general padding for Android
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1, // Softer shadow
    shadowRadius: 5,
    elevation: 8, // Standard elevation
  },
});

export default BottomSheetModal;
