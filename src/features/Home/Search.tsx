import React from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/contexts/ThemeContext';
import { SearchProps } from '@/src/types/components/home';


export default function Search({
  value,
  onChangeText,
  placeholder,
  containerStyle = {},
  gradientColors = ['#e15184', '#fA6876'],
  isRTL = false,
  ...rest
}: SearchProps) {
  const { t } = useTranslation();
  const {colors} = useTheme()
  return (
    <>
    <View style={styles.discoverView}>
      <Text style={[styles.discoverText ,{color: colors.primary}]}> {t(`discover`)}</Text>
    </View>
    <ExpoLinearGradient
      pointerEvents="box-none"
      colors={gradientColors}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        styles.searchContainer,
        containerStyle,
      ]}
    >
      <View 
        style={[
          styles.innerContainer,
          isRTL && styles.innerContainerRTL
        ]}
      >
        <FontAwesome
          name="search"
          size={20}
          color="#fff"
          style={styles.icon}
        />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || t("search")}
          placeholderTextColor="#fff"
          style={[
            styles.input,
            isRTL && styles.inputRTL
          ]}
          selectionColor="#fff"
          {...rest}
        />
      </View>
    </ExpoLinearGradient>
      </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 15,
    minHeight: 45,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  innerContainerRTL: {
    flexDirection: 'row-reverse',
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 0,
    backgroundColor: 'transparent',
    textAlign: 'left',
    outlineWidth: 0,
    borderWidth: 0,
  },
  inputRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  discoverView:{
   paddingHorizontal:15 , 
   paddingTop:10
  },
  discoverText:{
    fontSize:20 ,
    fontWeight:"bold"
  }
});