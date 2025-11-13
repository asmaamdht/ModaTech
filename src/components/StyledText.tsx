import React from "react";
import {
  Text, StyleSheet
} from "react-native";

type StyleTextType = {
  title: string,
}
const StyledText: React.FC<StyleTextType> = ({ title }) => {
  return (
    <Text style={StyleTitle.title}>{title}</Text>
  );
};

export default StyledText;



const StyleTitle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 35,
  },

});


