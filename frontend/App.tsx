import { ThemeProvider } from "./context/themeContext";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigators from "./navigation/BottomTabNavigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <StatusBar />
        <ThemeProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
