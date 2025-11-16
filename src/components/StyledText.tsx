import React from "react";
import { StyleSheet, Text } from "react-native";

type StyledTextType = {
  title: string;
  style?: object;
};
const StyledText: React.FC<StyledTextType> = ({ title, style }) => {
  return <Text style={[StyleTitle.title, style]}>{title}</Text>;
};

export default StyledText;

const StyleTitle = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "400",
    //marginBottom: 35,
  },
});
