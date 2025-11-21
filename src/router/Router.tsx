//import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "@/src/constants/Routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider} from "../contexts/ThemeContext";
import Loaduserdata from "../features/Login/Loaduserdata";
import ProductDetails from "../features/ProductDetails/ProductDetails";
import { RootState } from "../redux/store";
import MainNavigator from "./MainNavigator";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
const Router = () => {
  // const getUser = async () => {
  //   const res = (await AsyncStorage.getItem("user")) || "";
  //   return JSON.parse(res);
  // };

  // const isUser = false;
  const user = useSelector((state: RootState) => state.user);
   const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

   if (isLoading) {
    return (
      <ThemeProvider>
        <View style={styles.loadingContainer}>
          <Loaduserdata onLoadComplete={() => setIsLoading(false)} />
          <ActivityIndicator size="large" color="#e15184" />
        </View>
      </ThemeProvider>
    );
  }

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
        

          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* {user.token ? (
              <> */}
            <Stack.Screen
              name={ROUTES.MAIN_NAV}
              component={MainNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ROUTES.PRODUCT_DETAISL}
              component={ProductDetails}
            />
            {/* </>
            ) : (
              <Stack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
            )} */}
          </Stack.Navigator>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});


export default Router;
