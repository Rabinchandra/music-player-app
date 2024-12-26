import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import ttw from "@jaredh159/twrn";
import importedRecentlyPlayed from "../../dummyData/recentlyPlayed.json";
import { Song } from "../../model/model";
import { ScrollView } from "react-native-gesture-handler";
import { cardStyles } from "../../constants/styleConstants";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Song: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Song">;

type RecentlyPlayedProps = {
  title: string;
  thumbnail: string;
  artist: string;
  pressHandler: () => void;
};

const RecentlyPlayedCard = ({
  title,
  thumbnail,
  artist,
  pressHandler,
}: RecentlyPlayedProps) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View>
        <Image
          source={{
            uri: thumbnail,
          }}
          style={tw`h-${cardStyles.smHeight} w-${cardStyles.smWidth} rounded-lg mr-4`}
        />
        <View style={tw`mt-2`}>
          <Text style={[tw`font-bold`, , ttw`dark:text-white`]}>{title}</Text>
          <Text style={[tw`text-gray-500`, ttw`dark:text-gray-300`]}>
            {artist}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RecentlyPlayed = () => {
  const recentlyPlayed = (importedRecentlyPlayed as Song[]) || [];
  const navigation = useNavigation<NavigationProp>();

  const onPressRecentlyPlayed = () => {
    navigation.navigate("Song");
  };

  return (
    <View style={tw`mt-6`}>
      <Text style={[tw`text-2xl font-bold mb-4`, ttw`dark:text-white`]}>
        Recently Played
      </Text>

      {/* Card */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recentlyPlayed.map((song) => (
          <RecentlyPlayedCard
            key={song.id}
            title={song.title}
            thumbnail={song.thumbnailUrl}
            pressHandler={onPressRecentlyPlayed}
            artist={song.artist}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentlyPlayed;
