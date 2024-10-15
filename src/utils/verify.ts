import { AccountInfo } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";
import * as snarkjs from "snarkjs";
import { BACKEND, getMultiSign } from "./helper";

export const proveAndVerify = async (
  twitterId: string,
  account: AccountInfo | null,
  signTransaction: any
) => {
  const input = {
    twitterUserId: twitterId,
    signatureVerified: "1",
  };
  try {
    const wasmPath = "/files/auth/circuit.wasm";
    const zkeyPath = "files/auth/circuit_0000.zkey";
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      input,
      wasmPath,
      zkeyPath
    );
    const stringifiedJson = JSON.stringify(proof);
    const bufferString = Buffer.from(stringifiedJson, "binary").toString(
      "base64"
    );
    console.log("🚀 ~ bufferString:", bufferString);
    const stringifiedJsonSignals = JSON.stringify(publicSignals);
    const bufferStringSignals = Buffer.from(
      stringifiedJsonSignals,
      "binary"
    ).toString("base64");
    console.log("🚀 ~ bufferStringSignals:", bufferStringSignals);
    const data = await axios.get(
      `${BACKEND}/verify?proof=${bufferString}&publicSignals=${bufferStringSignals}`
    );
    console.log("🚀 ~ data:", data);
    if (data) {
      const signdata = await getMultiSign(account, signTransaction);
      return {
        success: signdata.success,
        hash: signdata.hash,
      };
      return signdata;
    }
    return {
      success: false,
      hash: "null",
    };
  } catch (error: any) {
    console.error("Error in proveAndVerify:", error.message || error);
    throw new Error(
      "Verification failed due to an error. Please try again later."
    );
  }
};
