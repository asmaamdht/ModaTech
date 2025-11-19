import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput } from 'react-native';

type StyledInputType = {
  value: string,
  editable?: boolean,
  placeholder?:string,
  onChangeText?:(text: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  style?:object
}
const StyledInput: React.FC<StyledInputType> = ({ value, editable, placeholder,onChangeText,onBlur,secureTextEntry, style }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  return (
    <TextInput
    placeholder={placeholder}
      style={[styles.input,style , { 
          textAlign: isRTL ? "right" : "left",
        },]}
      value={value}
      editable={editable}
      onChangeText={onChangeText}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default StyledInput;


const styles = StyleSheet.create({
  input: {
    
    backgroundColor: '#f3f6ffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    color: '#555',
  },

});