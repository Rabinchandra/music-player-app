import React from "react";
import { View, Text } from "react-native";
import tw from "@jaredh159/twrn";
import { useTheme } from "../context/themeContext";

const ThemeToggler = () => {
  const { toggleTheme } = useTheme();

  return (
    <View>
      <Text onPress={toggleTheme} style={tw`dark:text-white`}>
        Toggle Theme
      </Text>
    </View>
  );
};

export default ThemeToggler;
