import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HOME_SCREEN_NAME } from "../screens/HomeScreen";
import { SEARCH_SCREEN_NAME } from "../screens/SearchScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import SearchStackNavigator from "./SearchStackNavigator";

const Tab = createBottomTabNavigator();

function BottomTabNavigators() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen component={HomeStackNavigator} name={HOME_SCREEN_NAME} />
      <Tab.Screen component={SearchStackNavigator} name={SEARCH_SCREEN_NAME} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigators;
