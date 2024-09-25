"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { PropsWithChildren } from "react";
// import { useAutoConnect } from "./AutoConnectProvider";
// import { useToast } from "./ui/use-toast";

export const WalletProvider = ({ children }: PropsWithChildren) => {
  // const { autoConnect } = useAutoConnect();
//   const { toast } = useToast();

  const wallets = [
    new FewchaWallet(),
    new MartianWallet(),
    new PontemWallet(),
  ];

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      onError={(error) => {
        console.log("🚀 ~ WalletProvider ~ error:", error)
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};
