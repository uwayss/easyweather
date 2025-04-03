import { ToastAndroid } from "react-native";

export function longToast(msg: string) {
  ToastAndroid.show(msg, ToastAndroid.LONG);
}
