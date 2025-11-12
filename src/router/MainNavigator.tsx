import { ROUTES } from "@/src/constants/Routes";
import Cart from "@/src/features/Cart/Cart";
import Profile from "@/src/features/Profile/Profile";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import StackNavigator from "./StackNavigator";

const MainNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator();
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: styles.tabContainer,
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name={ROUTES.STACK}
        component={StackNavigator}
        options={{
          headerTitle: "",
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="home"
              size={24}
              color={focused ? "blue" : "black"}
            />
          ),
        }}
      />
      <Screen
        name={ROUTES.CART}
        component={Cart}
        options={{
          headerTitle: "",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="opencart"
              size={24}
              color={focused ? "blue" : "black"}
            />
          ),
        }}
      />
      <Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          headerTitle: "",
          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color={focused ? "blue" : "black"} />
          ),
        }}
      />
    </Navigator>
  );
};

export default MainNavigator;
const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: wp("80"),
    borderRadius: 30,
    marginHorizontal: wp("10"),
    bottom: hp("6"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: hp("4"),
  },
});
