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
    padding: 12,
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
    // gap: 8,
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
  scrollHint: {
    textAlign: "right",
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    fontStyle: "italic",
  },
  hourText: {
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
    width: "100%",
  },
});
