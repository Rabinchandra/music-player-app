import React from "react";
import { SafeAreaView } from "react-native";

import ttw from "@jaredh159/twrn";
import tw from "twrnc";
import { useTheme } from "../context/themeContext";
import PopularPlaylist from "../components/HomeScreenComponents/PopularPlaylist";
import ThemeToggler from "../components/ThemeToggler";
import HomeHeader from "../components/HomeScreenComponents/HomeHeader";
import Categories from "../components/HomeScreenComponents/Categories";
import RecentlyPlayed from "../components/HomeScreenComponents/RecentlyPlayed";
import { ScrollView } from "react-native-gesture-handler";
import TopArtists from "../components/HomeScreenComponents/TopArtists";

export const HOME_SCREEN_NAME = "Home";

function HomeScreen() {
  useTheme();

  return (
    <SafeAreaView style={[tw`flex-1`, ttw`bg-white dark:bg-black`]}>
      <ScrollView style={tw`flex-1 pl-3 pb-6`}>
        <HomeHeader />
        <Categories />
        <PopularPlaylist />
        <RecentlyPlayed />
        <TopArtists />
        {/* <ThemeToggler /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
