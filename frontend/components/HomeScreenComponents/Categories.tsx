import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { colors } from "../../constants/colorConstants";
import tw from "twrnc";
import ttw from "@jaredh159/twrn";

type Category = {
  id: number;
  title: string;
  isActive: boolean;
};

const Categories = () => {
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
};

export default Categories;
