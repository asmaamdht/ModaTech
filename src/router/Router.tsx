//import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "@/src/constants/Routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

const Stack = createNativeStackNavigator();
const Router = () => {
  // const getUser = async () => {
  //   const res = (await AsyncStorage.getItem("user")) || "";
  //   return JSON.parse(res);
  // };

  const isUser = false;
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isUser ? (
          <Stack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
        ) : (
          <Stack.Screen
            name={ROUTES.MAIN_NAV}
            component={MainNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </>
  );
};
export default Router;
