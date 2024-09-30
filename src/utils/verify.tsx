import * as snarkjs from "snarkjs";



export const proveAndVerify = async (twitterId:string) => {
  const input = {
    twitterUserId: twitterId?twitterId:"1234567890123",
    signatureVerified: "1",
  };
  try {
    const wasmPath =  "/files/auth/circuit.wasm";
    const zkeyPath =  "files/auth/circuit_0000.zkey";

    const {proof , publicSignals} = await snarkjs.groth16.fullProve(
        input,
        wasmPath,
        zkeyPath
    )
    console.log("🚀 ~ proveAndVerify ~ proof:", proof)
    console.log("🚀 ~ proveAndVerify ~ publicSignals:", publicSignals)
    const stringifiedJson = JSON.stringify(proof)
    const bufferString = Buffer.from(stringifiedJson , 'binary').toString('base64')

    const stringifiedJsonSignals= JSON.stringify(publicSignals)
    console.log("🚀 ~ proveAndVerify ~ stringifiedJsonSignals:", stringifiedJsonSignals)
    const bufferStringSignals = Buffer.from(stringifiedJsonSignals , 'binary').toString('base64')
    console.log("🚀 ~ proveAndVerify ~ bufferStringSignals:", bufferStringSignals)
    return{
      bufferString:bufferString,
      bufferStringSignals: bufferStringSignals
    }
  } catch (error) {
    console.error("Error in proveAndVerify:", error);
    throw error;
  }
};
