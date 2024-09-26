import {
  AccountAddress,
  Aptos,
  AptosConfig,
  Network,
  NetworkToNetworkName,
  UserTransactionResponse,
} from "@aptos-labs/ts-sdk";

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


// export const getAccountName = async (address: string) => {
//   try {
//     const name = await aptos.getAccountNames({
//       accountAddress: "0x9f73f71584332614ea07a1d04b18b838cae48724d890404259d289ea0ccf1937",
//     });
//   } catch (error) {
//     console.error("Error fetching ANS name:", error);
//   }
// };

const protocolAddress = {
  kanalabs:
    "0x9538c839fe490ccfaf32ad9f7491b5e84e610ff6edc110ff883f06ebde82463d",
  hippo: "0x890812a6bbe27dd59188ade3bbdbe40a544e6e104319b7ebc6617d3eb947ac07",
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
