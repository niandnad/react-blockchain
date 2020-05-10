import React from "react";
import MyCoins from "./components/MyCoins";
import Dropdown from "./components/Dropdown";
import "./styles.css";

export default class BlockchainApp extends React.Component {

  render() {
    return (
      <div className="bc-app">
        <h1>Blockchain Tracker</h1>
        <Dropdown />
        <MyCoins />
      </div>
    );
  }

}
