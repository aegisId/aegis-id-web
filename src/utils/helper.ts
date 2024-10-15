import {
  AccountAddress,
  AccountAuthenticator,
  Aptos,
  AptosConfig,
  Deserializer,
  Network,
  NetworkToNetworkName,
  UserTransactionResponse,
} from "@aptos-labs/ts-sdk";
import { AccountInfo } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";

export const BACKEND = "http://localhost:3006";
const APTOS_NETWORK: Network = NetworkToNetworkName[Network.MAINNET];
const config = new AptosConfig({
  network: APTOS_NETWORK,
  fullnode: "https://api.mainnet.aptoslabs.com/v1",
});
export const aptos = new Aptos(config);

export const getTotalNumberOfTransaction = async (address: string) => {
  const accountInfo = await aptos.getAccountInfo({
    accountAddress: AccountAddress.from(address),
  });
  return accountInfo.sequence_number;
};

export const getAccountAge = async (address: string) => {
  const accountInfo = await aptos.getAccountTransactions({
    accountAddress: AccountAddress.from(address),
    options: { offset: 0, limit: 1 },
  });
  const timeStamp = (accountInfo[0] as UserTransactionResponse).timestamp;
  const timestampMs = Number(timeStamp) / 1000;
  const date = new Date(timestampMs);
  return date;
};

const protocolAddress = {
  kanalabs:
    "0x9538c839fe490ccfaf32ad9f7491b5e84e610ff6edc110ff883f06ebde82463d",
  hippo: "0x890812a6bbe27dd59188ade3bbdbe40a544e6e104319b7ebc6617d3eb947ac07",
  chingari:
    "0x8d2d7bcde13b2513617df3f98cdd5d0e4b9f714c6308b9204fe18ad900d92609",
  wapl: "0x6547d9f1d481fdc21cd38c730c07974f2f61adb7063e76f9d9522ab91f090dac",
  eragon: "0x6d138096fb880d1c16b48f10686b98a96000c0ac18501425378f784c6b81c34d",
  merkle: "0x5ae6789dd2fec1a9ec9cccfb3acaf12e93d432f0a3a42c92fe1a9d490b7bbc06",
  panora: "0x1c3206329806286fd2223647c9f9b130e66baeb6d7224a18c1f642ffe48f3b4c",
  cellana: "0x4bf51972879e3b95c4781a5cdcb9e1ee24ef483e7d22f2d903626f126df62bd1",
  areis: "0x9770fa9c725cbd97eb50b2be5f7416efdfd1f1554beb0750d4dae4c64e860da3",
  thalaSwap:
    "0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af",
  liquidswapV0:
    "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12",
  thalaLsd:
    "0xfaf4e633ae9eb31366c9ca24214231760926576c7b625313b3688b5e900731f6",
  thalaProtocol:
    "0x6f986d146e4a90b828d8c12c14b6f4e003fdff11a8eecceceb63744363eaac01",
  amnis: "0x111ae3e5bc816a5e63c2da97d0aa3886519e0cd5e4b046659fa35796bd11542a",
};
export const getProtocolsInteracted = async (address: string) => {
  const accountInfo = await aptos.getAccountInfo({
    accountAddress: address,
  });
  let totalNumberOfTransaction = Number(accountInfo.sequence_number);

  let totalIteration = 10;

  let totakInteracted = {
    kanalabs: 0,
    hippo: 0,
    amnis: 0,
    areis: 0,
    cellana: 0,
    chingari: 0,
    eragon: 0,
    liquidswapV0: 0,
    merkle: 0,
    panora: 0,
    thalaLsd: 0,
    thalaProtocol: 0,
  };

  let totalGas = 0;

  for (let i = 0; i < totalIteration; i++) {
    const transaction = await aptos.getAccountTransactions({
      accountAddress: address,
      options: {
        offset: totalNumberOfTransaction,
        limit: 100,
      },
    });

    //inner loop to get transaction data
    // eslint-disable-next-line no-loop-func
    transaction.forEach((transaction) => {
      const userTransaction = transaction as UserTransactionResponse;
      let functionName = (userTransaction.payload as any).function;
      const moduleAddres = (functionName as String).split("::")[0];

      totalGas = Number(totalGas) + Number(userTransaction.gas_used);
      if (moduleAddres === protocolAddress.kanalabs) {
        totakInteracted.kanalabs = totakInteracted.kanalabs + 1;
      } else if (moduleAddres === protocolAddress.hippo) {
        totakInteracted.hippo = totakInteracted.hippo + 1;
      } else if (moduleAddres === protocolAddress.amnis) {
        totakInteracted.amnis = totakInteracted.amnis + 1;
      } else if (moduleAddres === protocolAddress.areis) {
        totakInteracted.areis = totakInteracted.areis + 1;
      } else if (moduleAddres === protocolAddress.cellana) {
        totakInteracted.cellana = totakInteracted.cellana + 1;
      } else if (moduleAddres === protocolAddress.chingari) {
        totakInteracted.chingari = totakInteracted.chingari + 1;
      } else if (moduleAddres === protocolAddress.eragon) {
        totakInteracted.eragon = totakInteracted.eragon + 1;
      } else if (moduleAddres === protocolAddress.liquidswapV0) {
        totakInteracted.liquidswapV0 = totakInteracted.liquidswapV0 + 1;
      } else if (moduleAddres === protocolAddress.merkle) {
        totakInteracted.merkle = totakInteracted.merkle + 1;
      } else if (moduleAddres === protocolAddress.panora) {
        totakInteracted.panora = totakInteracted.panora + 1;
      } else if (moduleAddres === protocolAddress.thalaLsd) {
        totakInteracted.thalaLsd = totakInteracted.thalaLsd + 1;
      } else if (moduleAddres === protocolAddress.thalaProtocol) {
        totakInteracted.thalaProtocol = totakInteracted.thalaProtocol + 1;
      }
    });

    totalNumberOfTransaction = totalNumberOfTransaction - 100;
    if (totalNumberOfTransaction < 0) {
      break;
    }
  }
  return {
    protocal: totakInteracted,
    totalGas: totalGas / 10000000,
  };
};

export const getMultiSign = async (
  account: AccountInfo | null,
  signTransaction: any
) => {
  const config = new AptosConfig({ network: Network.DEVNET });
  const aptos = new Aptos(config);
  const transaction = await aptos.transaction.build.multiAgent({
    sender: account?.address!,
    secondarySignerAddresses: [
      "6ca27696c78c7472918773fc2d893407d9590bdc707c56954bbc33ad0b0b0bfc",
    ],
    data: {
      function:
        "0x6ca27696c78c7472918773fc2d893407d9590bdc707c56954bbc33ad0b0b0bfc::aegis::add_twitter",
      functionArguments: [],
    },
  });

  const rawTransactionBytes = transaction.rawTransaction.bcsToBytes();
  const requestBody: { data: Uint8Array } = { data: rawTransactionBytes };
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(`${BACKEND}/sign`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestBody),
  });
  if (response.status >= 400) {
    await response.json().then((data) => {
      throw new Error(
        data?.error || data?.message || "Error in sponsoring transaction."
      );
    });
  }
  const responseData = await response.json();
  const aegisAuth = new Uint8Array(Object.values(responseData.aegisAuth));
  const deserializerAegis = new Deserializer(aegisAuth);
  const aegisSignature = AccountAuthenticator.deserialize(deserializerAegis);
  const aliceSignature = await signTransaction(transaction);

  const pendingTransferTxn = await aptos.transaction.submit.multiAgent({
    transaction: transaction,
    senderAuthenticator: aliceSignature,
    additionalSignersAuthenticators: [aegisSignature],
  });

  const txnreceipt = (await aptos.waitForTransaction({
    transactionHash: pendingTransferTxn.hash,
    options: { checkSuccess: true },
  })) as UserTransactionResponse;
  return txnreceipt.success;
};

export async function sendOTP(phoneNumber: string): Promise<boolean> {
  try {
    const response = await axios.get(`${BACKEND}/mobile/send`, {
      params: { phoneNumber },
    });
    return response.data.success === true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
}

export async function verifyOTP(
  phoneNumber: string,
  otp: string
): Promise<boolean> {
  try {
    const response = await axios.get(`${BACKEND}/mobile/verify`, {
      params: { phoneNumber, otp },
    });
    return (
      response.data.success === true && response.data.message === "OTP verified"
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
}
