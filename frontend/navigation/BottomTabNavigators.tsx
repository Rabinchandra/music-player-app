import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HOME_SCREEN_NAME } from "../screens/HomeScreen";
import { SEARCH_SCREEN_NAME } from "../screens/SearchScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import SearchStackNavigator from "./SearchStackNavigator";
import { useTheme } from "../context/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colorConstants";

const Tab = createBottomTabNavigator();

function BottomTabNavigators() {
  const { mode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: "play-outline" | "search-outline" = "play-outline";

          if (route.name == HOME_SCREEN_NAME) {
            iconName = "play-outline";
          } else if (route.name == SEARCH_SCREEN_NAME) {
            iconName = "search-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: colors.primaryGreenColor,
        tabBarInactiveTintColor: mode == "dark" ? "white" : "black",
        tabBarStyle: {
          backgroundColor: mode == "dark" ? "black" : "white",
          borderColor: "transparent",
        },
      })}
    >
      <Tab.Screen
        component={HomeStackNavigator}
        name={HOME_SCREEN_NAME}
        options={{ title: "Play" }}
      />
      <Tab.Screen
        component={SearchStackNavigator}
        name={SEARCH_SCREEN_NAME}
        options={{ title: "Search" }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigators;
