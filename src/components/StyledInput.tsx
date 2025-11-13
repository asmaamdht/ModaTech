import React from "react";
import { StyleSheet, TextInput } from 'react-native';

type StyledInputType = {
  value: string,
  editable: boolean,
}
const StyledInput: React.FC<StyledInputType> = ({ value, editable }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      editable={editable}
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