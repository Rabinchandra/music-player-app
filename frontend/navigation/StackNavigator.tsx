import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SongScreen, { SONG_SCREEN_NAME } from "../screens/SongScreen";
import BottomTabNavigators from "./BottomTabNavigators";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={BottomTabNavigators} name="BottomTabs" />
      <Stack.Screen component={SongScreen} name={SONG_SCREEN_NAME} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
