import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  windTitle: {
    marginBottom: 8,
  },
  windBar: {
    height: 100,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  humidityTitle: {
    marginBottom: 8,
  },
  humidityBar: {
    height: 100,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
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
    paddingVertical: 8,
    paddingRight: 20,
  },
  hourlyItem: {
    alignItems: "center",
    marginRight: 16,
    width: 45,
    gap: 8,
  },
  precipitationBar: {
    height: 100,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  temperatureBar: {
    height: 100,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  progressBar: {
    height: 24,
    borderRadius: 4,
    transform: [{ rotate: "270deg" }],
    width: 100,
    marginBottom: 42,
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
    flexWrap: "nowrap",
  },
});
