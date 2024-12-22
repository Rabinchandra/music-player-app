import React from "react";
import { View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

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

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View>
      <Text>Hey, I've a home</Text>
      <Text onPress={() => navigation.navigate("SongsList")}>
        Go to Songs List
      </Text>
    </View>
  );
}

export default HomeScreen;
