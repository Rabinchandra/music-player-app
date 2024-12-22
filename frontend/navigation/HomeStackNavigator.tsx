import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen, { HOME_SCREEN_NAME } from "../screens/HomeScreen";
import SongsListScreen, {
  SONGS_LIST_SCREEN_NAME,
} from "../screens/SongsListScreen";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={HomeScreen}
        name={HOME_SCREEN_NAME}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        component={SongsListScreen}
        name={SONGS_LIST_SCREEN_NAME}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
