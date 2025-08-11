// FILE: src/screens/HomeScreen/SearchRow.tsx
import React from "react";
import { View } from "react-native";

import { LocationSearch } from "./LocationSearch";

const SearchRowComponent: React.FC = () => {
  return (
    <View className="flex-row items-center">
      <LocationSearch />
    </View>
  );
};

export default React.memo(SearchRowComponent);
