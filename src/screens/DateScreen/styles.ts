import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  currentHour: {
    backgroundColor: "rgba(0, 109, 119, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  windTitle: {
    marginBottom: 8,
  },
  humidityTitle: {
    marginBottom: 8,
  },
  button: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
  },

  cardContent: {
    padding: 12,
  },

  hourlyScroll: {
    flexGrow: 0,
  },
  hourlyContainer: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  graphContainer: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  hourlyItem: {
    alignItems: "center",
    gap: 4,
    width: 45,
  },
  customProgressBar: {
    width: 18,
    height: 80,
  },
  scrollFadeGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 50,
    opacity: 0.3,
    zIndex: 0,
    pointerEvents: "none",
  },

  hourText: {
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
    width: "100%",
  },
  titleContainer: {
    width: "100%",
  },
});
