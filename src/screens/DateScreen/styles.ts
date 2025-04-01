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
  scrollHint: {
    textAlign: "right",
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    fontStyle: "italic",
  },
  scrollContent: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  hourText: {
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
    width: "100%",
  },
  tabButton: {
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
  },
  activeTab: {
    backgroundColor: "rgba(0, 109, 119, 0.2)",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  titleContainer: {
    width: "100%",
  },
  title: {
    textAlign: "center",
  },
});
