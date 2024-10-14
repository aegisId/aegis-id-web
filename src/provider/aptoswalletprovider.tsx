import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { PropsWithChildren } from "react";
import useNotification from '../hooks/useNotification';

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const {  showError, NotificationComponent } = useNotification();

  const wallets = [
    new FewchaWallet(),
    new MartianWallet(),
    new PontemWallet(),
  ];

  return (
    <>
    {NotificationComponent}
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      onError={(error) => {
        showError(error)
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
    </>
  );

};
