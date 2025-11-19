import { ROUTES } from "@/src/constants/Routes";
import Login from "@/src/features/Login/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import WelcomePage from "../components/WeclcomePage";
import OnboardingScreen from "../components/onboardinscreen";

const AuthStack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
       initialRouteName={ROUTES.WELCOME}
    >
      <AuthStack.Screen name={ROUTES.WELCOME} component={WelcomePage}/>
      <AuthStack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen}/>
      <AuthStack.Screen name={ROUTES.LOGIN} component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;







