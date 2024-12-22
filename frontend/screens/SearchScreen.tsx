import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

export const SEARCH_SCREEN_NAME = "SearchScreen";

// Define parameter list for stack navigator
// Contains the params we can pass to navigation.navigate()
type RootStackParamList = {
  SearchScreen: undefined;
  SongsList: undefined;
};

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchScreen"
>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

function SearchScreen({ navigation }: SearchScreenProps) {
  return (
    <View>
      <Text>Search Screen</Text>
      <Text onPress={() => navigation.navigate("SongsList")}>
        Open Songs List Screen
      </Text>
    </View>
  );
}

export default SearchScreen;
