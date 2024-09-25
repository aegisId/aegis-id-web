import * as React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
// import { AutoConnectProvider } from "./provider/AutoConnectProvider";
import { WalletProvider } from "./provider/aptoswalletprovider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <WalletProvider>
        <App />
      </WalletProvider>
  </React.StrictMode>
);
