//import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "@/src/constants/Routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "../contexts/ThemeContext";
import Loaduserdata from "../features/Login/Loaduserdata";
import { RootState } from "../redux/store";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

const queryClient = new QueryClient();


const Stack = createNativeStackNavigator();
const Router = () => {
  // const getUser = async () => {
  //   const res = (await AsyncStorage.getItem("user")) || "";
  //   return JSON.parse(res);
  // };

  // const isUser = false;
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      < ThemeProvider >

        <QueryClientProvider client={queryClient}>
          <Loaduserdata />

          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user.token ? (
              <Stack.Screen
                name={ROUTES.MAIN_NAV}
                component={MainNavigator}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen name={ROUTES.AUTH} component={AuthNavigator} />

            )}
          </Stack.Navigator>

        </QueryClientProvider >
      </ThemeProvider >

    </>
  );
};
export default Router;
