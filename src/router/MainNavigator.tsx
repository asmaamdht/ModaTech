import { ROUTES } from "@/src/constants/Routes";
import Cart from "@/src/features/Cart/Cart";
import Profile from "@/src/features/Profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomBottomNav from "../components/CustomBottomNav";
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
      tabBar={(props) => <CustomBottomNav {...props} />}
    >
      <Screen
        name={ROUTES.STACK}
        component={StackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name={ROUTES.CART}
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};

export default MainNavigator;
const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: wp("85"),
    borderRadius: 50,
    marginHorizontal: wp("5"),
    bottom: hp("6"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: hp("4"),
  },
  label: {
    color: "#FFFFF",
    fontWeight: 500,
  },
});
