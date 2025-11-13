import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

type CustomBottomType = {
  value: string;
  onPress: (event: GestureResponderEvent) => void;
};



const CustomBottomNav: React.FC<CustomBottomType> = ({ value, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.7} >
      <Text style={styles.btnText}>{value}</Text>
    </TouchableOpacity>
  );
};

export default CustomBottomNav;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fe6db2',
    marginTop: 40,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
