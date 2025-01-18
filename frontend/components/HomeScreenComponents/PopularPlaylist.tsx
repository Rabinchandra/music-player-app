import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import ttw from "@jaredh159/twrn";
import importedPlayList from "../../dummyData/popularPlaylist.json";
import { Playlist } from "../../model/model";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { cardStyles } from "../../constants/styleConstants";

type PlayListProps = {
  title: string;
  thumbnail: string;
  caption: string;
  pressHandler: () => void;
};

type RootStackParamList = {
  SongsList: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "SongsList">;

const PopularPlayListCard = ({
  title,
  thumbnail,
  caption,
  pressHandler,
}: PlayListProps) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={tw`relative`}>
        <Image
          source={{ uri: thumbnail }}
          style={tw`w-${cardStyles.width} h-${cardStyles.height} object-cover rounded-lg`}
        />
        <View style={tw`absolute bottom-0 p-2 overflow-hidden`}>
          <Text style={tw`font-bold text-white text-lg`}>{title}</Text>
          <Text style={tw`text-white text-gray-300`}>{caption}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PopularPlaylist = () => {
  const playList = (importedPlayList as Playlist[]) || [];
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={tw`mt-5`}>
      {/* Header */}
      <Text style={[tw`text-2xl font-bold pb-4`, ttw`dark:text-white`]}>
        Popular Playlist
      </Text>

      {/* PlayList */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={tw`flex-row gap-5`}>
          {playList.map((item, index) => (
            <PopularPlayListCard
              title={item.title}
              caption={item.caption}
              thumbnail={item.thumbnail}
              key={index}
              pressHandler={() => navigation.navigate("SongsList")}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PopularPlaylist;
