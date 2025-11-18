import { LinearGradient } from "expo-linear-gradient";
import React, { ReactElement } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type CustomBottomType = {
  value: string | React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  icon?: ReactElement;
  style?: object;
  textStyle?: object;
  disabled?: boolean
};

const StyledButton: React.FC<CustomBottomType> = ({
  value,
  onPress,
  icon,
  style,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={disabled}>
      <LinearGradient
        colors={["#da498a", "#f66479"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.btn, style]}
      >
        {typeof value === "string" ? 
        <Text style={[styles.btnText, textStyle]}>{value}</Text>
        :
        value}
        {icon}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  btn: {
    
    marginTop: 40,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});



