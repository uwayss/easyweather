import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { GraphDataPoint } from "../../utils/metricData";
import CustomVerticalProgressBar from "../../screens/DateScreen/CustomVerticalProgressBar";

const Item = React.memo(function Item({ item }: { item: GraphDataPoint }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.value}</Text>
      <CustomVerticalProgressBar
        progress={item.progress}
        color={item.color}
        style={styles.customProgressBar}
      />
      <Text style={styles.itemText}>{item.label}</Text>
    </View>
  );
});
export default function Graph({ data }: { data: GraphDataPoint[] }) {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={item => item.time}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={false}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    gap: 4,
    width: 45,
  },
  hightlightedItem: {
    backgroundColor: "rgba(0, 109, 119, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  itemText: {
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
    width: "100%",
  },
  customProgressBar: {
    width: 18,
    height: 80,
  },
});
