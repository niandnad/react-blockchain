import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import BlockchainApp from "./BlockchainApp";
import { loadCoins } from "./redux/actions";

store.dispatch(loadCoins(20));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BlockchainApp />
  </Provider>,
  rootElement
);
