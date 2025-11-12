//import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "@/src/constants/Routes";
import Login from "@/src/features/Login/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
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
          <Stack.Screen name={ROUTES.LOGIN} component={Login} />
        ) : (
          <Stack.Screen name={ROUTES.STACK} component={MainNavigator} />
        )}
      </Stack.Navigator>
    </>
  );
};
export default Router;
