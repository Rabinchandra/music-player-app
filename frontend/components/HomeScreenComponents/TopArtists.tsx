import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import ttw from "@jaredh159/twrn";
import importedTopArtists from "../../dummyData/topArtists.json";
import { Artist } from "../../model/model";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  SongsList: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "SongsList">;

const TopArtists = () => {
  const topArtists = (importedTopArtists as Artist[]) || [];
  const navigation = useNavigation<NavigationProp>();

  const onPressTopArtists = () => {
    navigation.navigate("SongsList");
  };

  return (
    <View>
      <Text style={[tw`text-2xl font-bold my-4`, ttw`dark:text-white`]}>
        Top Artists
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={tw`flex-row gap-3`}>
          {topArtists.map((artist) => (
            <TouchableOpacity
              key={artist.id}
              style={tw`gap-2`}
              onPress={onPressTopArtists}
            >
              <Image
                source={{ uri: artist.thumbnail }}
                style={tw`w-30 h-30 rounded-full`}
              />
              <Text style={[tw`font-bold text-center`, ttw`dark:text-white`]}>
                {artist.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TopArtists;
