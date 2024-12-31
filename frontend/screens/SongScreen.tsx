import { View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";

export const SONG_SCREEN_NAME = "Song";

const SongScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState<number | null>(null);

  async function playSound() {
    try {
      if (sound && isPaused) {
        // Resume playback if paused
        console.log("Resuming Sound");
        await sound.playFromPositionAsync(playbackPosition ?? 0);
        setIsPaused(false);
        setIsPlaying(true);
      } else {
        // Load and play new sound
        console.log("Loading Sound");
        const { sound: newSound } = await Audio.Sound.createAsync(
          require("../assets/music/dance_monkey.mp3")
        );

        setSound(newSound);
        setIsPlaying(true);
        await newSound.playAsync();
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
          setPlaybackPosition(status.positionMillis); // Store playback position
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

  return (
    <View>
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Pause Sound" onPress={pauseSound} />
    </View>
  );
};

export default SongScreen;
