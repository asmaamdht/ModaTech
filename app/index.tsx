import { store } from "@/src/redux/store";
import Router from "@/src/router/Router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

const index = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <Router />
      <Toast />
    </Provider>
    </GestureHandlerRootView>
  )


};

export default index;
