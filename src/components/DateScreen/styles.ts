import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    marginVertical: 8,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    padding: 16,
  },
  weatherHeader: {
    alignItems: "center",
  },
  temperatureContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  temperatureItem: {
    alignItems: "center",
  },
  precipitationTitle: {
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  scrollContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  hourlyScroll: {
    flexGrow: 0,
  },
  hourlyContainer: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
    // paddingRight: 20,
  },
  hourlyItem: {
    alignItems: "center",
    // marginRight: 16,
    gap: 8,
    width: 50,
  },
  customProgressBar: {
    width: 24, // Or adjust as needed
    height: 100, // Set desired bar height
    // No transform needed
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
  scrollHint: {
    textAlign: "right",
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    fontStyle: "italic",
  },
  hourText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
    width: "100%",
  },
});
