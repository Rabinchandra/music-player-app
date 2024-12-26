import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { useTheme } from "../context/themeContext";
import { colors } from "../constants/colorConstants";

const ThemeToggler = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { toggleTheme } = useTheme();

  const toggleSwitch = () => {
    toggleTheme();
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Switch
        trackColor={{ true: colors.primaryGreenColor }}
        thumbColor={"WHITE"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default ThemeToggler;
