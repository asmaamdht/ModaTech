import { store } from "@/src/redux/store";
import Router from "@/src/router/Router";
import React from "react";
import { Provider } from "react-redux";

const index = () => {

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )


};

export default index;
