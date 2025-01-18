import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { ScrollView } from "react-native-gesture-handler";

type SongLyricsProps = {
  title: string;
  artist: string;
};

const SongLyrics = ({ title, artist }: SongLyricsProps) => {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getLyrics() {
    try {
      const res = await fetch(
        `http://localhost:4000/api/lyrics?title=${title}&artist=${artist}`
      );

      if (res.ok) {
        const data = await res.json();
        setLyrics(data.lyrics);
        console.log(data);
      } else {
        console.error("Failed to fetch lyrics");
      }
    } catch (error) {
      alert("Error fetching lyrics: " + error);
    }
  }

  useEffect(() => {
    console.log("Fetching lyrics");
    getLyrics().then(() => setIsLoading(false));
  }, [title, artist]);

  return (
    <>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView
          style={tw`rounded-[16px] h-100 p-4`}
          showsVerticalScrollIndicator={false}
        >
          <Text style={tw`text-white capitalize text-xl font-bold mb-2`}>
            Lyrics
          </Text>
          <Text style={tw`text-white leading-5`}>{lyrics}</Text>
        </ScrollView>
      )}
    </>
  );
};

export default SongLyrics;
