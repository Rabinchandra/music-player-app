import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import tw from "twrnc";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { colors } from "../constants/colorConstants";
import { LinearGradient } from "expo-linear-gradient";
import SongLyrics from "../components/SongLyrics";

export const SONG_SCREEN_NAME = "Song";

const SongScreen = () => {
  const navigation = useNavigation();
  const imageUri =
    "https://c.saavncdn.com/798/Dance-Monkey-English-2020-20200221154211-500x500.jpg";

  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  async function playSound() {
    try {
      if (sound && isPaused) {
        console.log("Resuming Sound");
        await sound.playFromPositionAsync(playbackPosition ?? 0);
        setIsPaused(false);
        setIsPlaying(true);
      } else {
        console.log("Loading Sound");
        const { sound: newSound } = await Audio.Sound.createAsync(
          require("../assets/music/dance_monkey.mp3"),
          { shouldPlay: true }
        );

        setSound(newSound);
        setIsPlaying(true);

        // Update duration
        const status = await newSound.getStatusAsync();

        if (status.isLoaded) {
          if (status.durationMillis !== undefined) {
            setDuration(status.durationMillis);
          }
        }

        // Track playback position
        /* This method is designed to register a callback function, updatePlaybackStatus, which will be invoked whenever the playback status of the newSound object changes. The callback function will be responsible for updating the playback position and slider value of the audio player. */
        newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      }
    } catch (error) {
      console.error("Error playing sound: ", error);
    }
  }

  async function pauseSound() {
    if (sound && isPlaying) {
      try {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPlaybackPosition(status.positionMillis);
        }
        console.log("Pausing Sound");
        await sound.pauseAsync();
        setIsPaused(true);
        setIsPlaying(false);
      } catch (error) {
        console.error("Error pausing sound: ", error);
      }
    }
  }

  const updatePlaybackStatus = (status: any) => {
    if (status.isLoaded && !isSliding) {
      setPlaybackPosition(status.positionMillis);
      setSliderValue(
        status.positionMillis / (status.durationMillis || 1) // Normalize slider value
      );
    }
  };

  const onSliderValueChange = async (value: number) => {
    if (sound && duration) {
      const newPosition = value * duration; // Calculate new position in millisecondss
      setPlaybackPosition(newPosition);
      setSliderValue(value); // Normalize slider value

      if (isPlaying) {
        await sound.playFromPositionAsync(newPosition);
      } else {
        await sound.setPositionAsync(newPosition);
      }
    }
  };

  // Method to convert milliseconds to a human-readable format
  const millisToMinutesAndSeconds = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = +((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access audio is required!");
      }
    };

    getPermissions();

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleGoBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={["#f54272", "#191414"]}
      locations={[0, 0.7]}
      style={tw`text-center p-4 flex-1`}
    >
      {/* Header */}
      <View style={tw`absolute px-3 z-20 my-6`}>
        <Text onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Text>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`h-130 mb-5`}>
          {/* Song Image */}
          <View style={tw`flex-1 justify-center items-center`}>
            <Image
              source={{
                uri: imageUri,
              }}
              style={tw`w-50 h-50`}
            />
            <View>
              <Text style={tw`font-bold mt-4 text-white text-2xl`}>
                Dance Monkey
              </Text>
            </View>
          </View>

          {/* Progress Slider */}
          <View style={{ width: "100%", height: 40 }}>
            <Slider
              style={{ width: "100%" }}
              minimumValue={0}
              maximumValue={1}
              value={sliderValue}
              onValueChange={(value) => {
                setIsSliding(true);
                setSliderValue(value);
              }}
              onSlidingComplete={(value) => {
                setIsSliding(false);
                onSliderValueChange(value);
              }}
              minimumTrackTintColor={"#fff"}
              maximumTrackTintColor="#8E8E93"
            />
          </View>

          {/* Duration */}
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white`}>
              {isSliding && duration
                ? millisToMinutesAndSeconds(sliderValue * duration)
                : playbackPosition
                ? millisToMinutesAndSeconds(playbackPosition)
                : `0:00`}
            </Text>
            <Text style={tw`text-white`}>
              {duration ? millisToMinutesAndSeconds(duration) : `0:00`}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={tw`flex-row justify-between py-4 items-center`}>
            <TouchableOpacity>
              <FontAwesome6
                name="shuffle"
                size={20}
                color={colors.primaryGreenColor}
              />
            </TouchableOpacity>

            <View style={tw`flex-row gap-2 items-center`}>
              {/* Previous */}
              <TouchableOpacity>
                <MaterialIcons name="skip-previous" size={30} color="white" />
              </TouchableOpacity>
              {/* Pause/Play */}
              <TouchableOpacity
                style={tw`bg-white rounded-full w-16 h-16 justify-center items-center`}
                onPress={isPlaying ? pauseSound : playSound}
              >
                {isPlaying ? (
                  <FontAwesome name="pause" size={30} color="black" />
                ) : (
                  <FontAwesome
                    name="play"
                    size={30}
                    color="black"
                    style={tw`ml-1`}
                  />
                )}
              </TouchableOpacity>
              {/* Next */}
              <TouchableOpacity>
                <MaterialIcons name="skip-next" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <FontAwesome6 name="repeat" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <SongLyrics title="dance monkey" artist="tone" />
      </ScrollView>
    </LinearGradient>
  );
};

export default SongScreen;
