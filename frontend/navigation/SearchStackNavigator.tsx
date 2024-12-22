import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen, { SEARCH_SCREEN_NAME } from "../screens/SearchScreen";
import SongsListScreen, {
  SONGS_LIST_SCREEN_NAME,
} from "../screens/SongsListScreen";

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen component={SearchScreen} name={SEARCH_SCREEN_NAME} />
      <SearchStack.Screen
        component={SongsListScreen}
        name={SONGS_LIST_SCREEN_NAME}
      />
    </SearchStack.Navigator>
  );
};

export default SearchStackNavigator;
