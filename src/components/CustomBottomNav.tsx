import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useTheme } from "../contexts/ThemeContext";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = "#f66479";
const SECONDARY_COLOR = "#fff";

const CustomBottomNav: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
  descriptors,
}) => {
  const { t } = useTranslation();
  const colors = useTheme();
  return (
    <BlurView intensity={50}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#da498a", "#f66479"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: hp("8"),
            flexDirection: "row",
            padding: wp("5"),
          }}
        >
          {state.routes.map((route, index) => {
            console.log(route);
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <AnimatedTouchableOpacity
                key={index}
                onPress={onPress}
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={[styles.tabBar]}
                layout={LinearTransition.springify().mass(0.5)}
              >
                {getIconByName(
                  label as string,
                  isFocused ? PRIMARY_COLOR : SECONDARY_COLOR,
                  isFocused
                )}
              </AnimatedTouchableOpacity>
            );
          })}
        </LinearGradient>
      </View>
    </BlurView>
  );
};

const getIconByName = (route: string, color: string, isFocused: boolean) => {
  switch (route) {
    case "Home":
      return (
        <Foundation
          name="home"
          size={24}
          color={color}
          style={[
            styles.icon,
            {
              backgroundColor: isFocused ? SECONDARY_COLOR : "transparent",
            },
          ]}
        />
      );
    case "Cart":
      return (
        <Feather
          name="shopping-cart"
          size={24}
          color={color}
          style={[
            styles.icon,
            {
              backgroundColor: isFocused ? SECONDARY_COLOR : "transparent",
            },
          ]}
        />
      );
    case "Profile":
      return (
        <Feather
          name="user"
          size={24}
          color={color}
          style={[
            styles.icon,
            {
              backgroundColor: isFocused ? SECONDARY_COLOR : "transparent",
            },
          ]}
        />
      );
    default:
      return (
        <Foundation
          name="home"
          size={24}
          color={color}
          style={[
            styles.icon,
            {
              backgroundColor: isFocused ? SECONDARY_COLOR : "transparent",
            },
          ]}
        />
      );
  }
};

export default CustomBottomNav;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: wp("100"),
    height: hp("8"),
    bottom: hp("0"),
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabBar: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: hp("7"),
  },
  icon: {
    borderRadius: 50,
    padding: hp("1"),
    width: wp("10"),
    alignSelf: "center",
    textAlign: "center",
  },
});
