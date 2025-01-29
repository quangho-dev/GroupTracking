import Colors from "@/constants/Colors";
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: any;
  containerStyles?: any;
}

const CustomButton = ({
  onPress,
  title,
  textStyles,
  containerStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.touchableOpacity, containerStyles]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: "white",
    borderRadius: 15,
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.dark.text,
    fontWeight: "semibold",
    fontSize: 20,
  },
});

export default CustomButton;
