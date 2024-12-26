import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";
import ttw from "@jaredh159/twrn";
// Header Component
function HomeHeader() {
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

export default HomeHeader;
