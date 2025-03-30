import { ToastAndroid } from "react-native";

export default function showToast(msg: string) {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}
export function longToast(msg: string) {
  ToastAndroid.show(msg, ToastAndroid.LONG);
}
