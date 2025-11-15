//import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "@/src/constants/Routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { ThemeProvider } from "../contexts/ThemeContext";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const Stack = createNativeStackNavigator();
const Router = () => {
  // const getUser = async () => {
  //   const res = (await AsyncStorage.getItem("user")) || "";
  //   return JSON.parse(res);
  // };

  const isUser = false;
  return (
    <>
     <ThemeProvider>
      <Provider store={store}>
       <QueryClientProvider client={queryClient}>
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
         </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};
export default Router;
