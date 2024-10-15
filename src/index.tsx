import * as React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
// import { AutoConnectProvider } from "./provider/AutoConnectProvider";
import { WalletProvider } from "./provider/aptoswalletprovider";
import { AppKitProvider } from "./provider/AutoConnectProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WalletProvider>
      <AppKitProvider>
        <App />
      </AppKitProvider>
    </WalletProvider>
  </React.StrictMode>
);
