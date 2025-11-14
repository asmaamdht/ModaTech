import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: object;
  gradientColors?: [string, string, ...string[]];
}

export default function Search({
  value,
  onChangeText,
  placeholder = "Search...",
  containerStyle = {},
  gradientColors = ['#e34558ff', '#f47076ff'],
  ...rest
}: SearchProps) {
  return (
    <ExpoLinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.searchContainer, containerStyle]}
    >
      <Icon name="search" size={20} color="#fff" style={{ marginHorizontal: 10 }} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        style={styles.input}
        selectionColor="#fff"
        {...rest}
      />
    </ExpoLinearGradient>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 0,
    backgroundColor: 'transparent',
    outlineWidth: 0,
    borderWidth: 0
  }
});
