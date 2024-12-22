import { ThemeProvider } from "./context/themeContext";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigators from "./navigation/BottomTabNavigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer>
          <BottomTabNavigators />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
