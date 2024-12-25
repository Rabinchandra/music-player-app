import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ttw from "@jaredh159/twrn";
import tw from "twrnc";
import { useTheme } from "../context/themeContext";
import { colors } from "../constants/colorConstants";
import { ScrollView } from "react-native-gesture-handler";
import PopularPlaylist from "../components/PopularPlaylist";
import ThemeToggler from "../components/ThemeToggler";

export const HOME_SCREEN_NAME = "Home";

// Define parameter list for stack navigator
// Contains the params we can pass to navigation.navigate()
type RootStackParamList = {
  Home: undefined;
  SongsList: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

type Category = {
  id: number;
  title: string;
  isActive: boolean;
};

// Header Component
function Header() {
  return (
    <View style={[tw`flex-row justify-between items-center pb-3 mx-2 pt-4`]}>
      <View>
        <Text style={[ttw`dark:text-white`, tw`text-3xl font-bold`]}>
          Good Morning
        </Text>
      </View>
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/portrait-young-african-man-profile_176420-12620.jpg",
        }}
        style={tw`rounded-full w-12 h-12`}
      />
    </View>
  );
}

// Categories
function Categories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, title: "All", isActive: true },
    { id: 2, title: "Music", isActive: false },
    { id: 3, title: "Podcasts", isActive: false },
    { id: 4, title: "Popular", isActive: false },
    { id: 5, title: "Hits", isActive: false },
  ]);
  const updateActiveCategory = (id: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isActive: category.id === id,
      }))
    );
  };

  return (
    <View style={tw`mt-3`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row" }}
      >
        {categories.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[
              ttw`py-2 px-5 rounded-lg`,
              c.isActive && {
                backgroundColor: `${colors.primaryGreenColor}`,
              },
            ]}
            onPress={() => updateActiveCategory(c.id)}
          >
            <Text
              style={[
                ttw`dark:text-white text-xl`,
                c.isActive && ttw`text-white dark:text-black`,
              ]}
            >
              {c.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function HomeScreen() {
  useTheme();

  return (
    <SafeAreaView style={[tw`flex-1`, ttw`bg-white dark:bg-black`]}>
      <View style={tw`flex-1 pl-3`}>
        <Header />
        <Categories />
        <PopularPlaylist />
        <ThemeToggler />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
