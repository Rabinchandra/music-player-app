import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import tw from "@jaredh159/twrn";
import twrnc from "twrnc";
import { useTheme } from "../context/themeContext";
import { colors } from "../constants/colorConstants";
import { ScrollView } from "react-native-gesture-handler";
import PopularPlaylist from "../components/PopularPlaylist";

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
    <View style={[twrnc`flex-row justify-between items-center p-3`]}>
      <View>
        <Text style={tw`dark:text-white text-3xl font-bold`}>Good Morning</Text>
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

function HomeScreen({ navigation }: HomeScreenProps) {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, title: "All", isActive: true },
    { id: 2, title: "Music", isActive: false },
    { id: 3, title: "Podcasts", isActive: false },
    { id: 4, title: "Popular", isActive: false },
    { id: 5, title: "Hits", isActive: false },
  ]);

  useTheme();

  const updateActiveCategory = (id: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isActive: category.id === id,
      }))
    );
  };

  return (
    <View style={[styles.container, tw`bg-white dark:bg-black pt-14 px-3`]}>
      {/* Header */}
      <Header />

      {/* Categories */}
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
                tw`py-2 px-5 rounded-lg`,
                c.isActive && {
                  backgroundColor: `${colors.primaryGreenColor}`,
                },
              ]}
              onPress={() => updateActiveCategory(c.id)}
            >
              <Text
                style={[
                  tw`dark:text-white text-xl`,
                  c.isActive && tw`text-white dark:text-black`,
                ]}
              >
                {c.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Popular Playlist */}
      <PopularPlaylist />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
