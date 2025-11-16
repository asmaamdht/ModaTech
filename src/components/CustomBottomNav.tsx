import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
//import { useTranslation } from "react-i18next";
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

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = "#f66479";

const StyledBottomNav: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
  descriptors,
}) => {
  //const { t } = useTranslation();
  return (
    <BlurView intensity={50}>
      <View style={styles.container}>
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
                isFocused ? "white" : PRIMARY_COLOR,
                isFocused
              )}
              {/* {isFocused && (
                <Animated.Text
                  style={{
                    padding: 10,
                    textAlign: "center",
                    color: PRIMARY_COLOR,
                    fontWeight: "500",
                  }}
                >
                  {t(label.toString()) as string}
                </Animated.Text>
              )} */}
            </AnimatedTouchableOpacity>
          );
        })}
      </View>
    </BlurView>
  );
};

const getIconByName = (route: string, color: string, isFocused: boolean) => {
  switch (route) {
    case "Home":
      return isFocused ? (
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={["#da498a", "#f66479"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              padding: wp("1"),
              borderRadius: 25,
            }}
          >
            <SimpleLineIcons
              name="home"
              size={24}
              color={"white"}
              style={styles.icon}
            />
          </LinearGradient>
        </View>
      ) : (
        <SimpleLineIcons
          name="home"
          size={24}
          color={color}
          style={styles.icon}
        />
      );
    case "Cart":
      return isFocused ? (
        <LinearGradient
          colors={["#da498a", "#f66479"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            padding: wp("1"),
            borderRadius: 25,
          }}
        >
          <FontAwesome
            name="opencart"
            size={24}
            color={"white"}
            style={styles.icon}
          />
        </LinearGradient>
      ) : (
        <FontAwesome
          name="opencart"
          size={24}
          color={color}
          style={styles.icon}
        />
      );
    case "Profile":
      return isFocused ? (
        <LinearGradient
          colors={["#da498a", "#f66479"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            padding: wp("1"),
            borderRadius: 25,
          }}
        >
          <Feather name="user" size={24} color={"white"} style={styles.icon} />
        </LinearGradient>
      ) : (
        <Feather name="user" size={24} color={color} style={styles.icon} />
      );
    default:
      return (
        <SimpleLineIcons
          name="home"
          size={24}
          color={color}
          style={styles.icon}
        />
      );
  }
};

export default StyledBottomNav;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(231, 227, 227, 0.5)",
    width: wp("88"),
    height: hp("7"),
    bottom: hp("3"),
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabBar: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    height: hp("7"),
    textAlignVertical: "center",
  },
  icon: {
    borderRadius: 25,
    padding: hp("1"),
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 25,
    width: wp("3"),
  },
});
