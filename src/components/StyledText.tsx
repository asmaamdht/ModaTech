import React from "react";
import {
  Text, StyleSheet
} from "react-native";

type StyledTextType = {
  title: string,
}
const StyledText: React.FC<StyledTextType> = ({ title }) => {
  return (
    <Text style={StyleTitle.title}>{title}</Text>
  );
};

export default StyledText;



const StyleTitle = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 25,
  },
});


