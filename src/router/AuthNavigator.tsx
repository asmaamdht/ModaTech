import { ROUTES } from "@/src/constants/Routes";
import Login from "@/src/features/Login/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const AuthStack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={ROUTES.LOGIN} component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
