import {
  BASE_FEE,
  Operation,
  TransactionBuilder,
  type Asset,
  type Memo,
  type Transaction,
} from "@stellar/stellar-sdk";
import type { StellarClient } from "./client";
import type { BuildPaymentParams, BuiltTx, SubmitResult } from "./types";

export type BuildPaymentOptions = {
  fee?: string;
  timeoutSeconds?: number;
};

export async function buildPaymentTx(
  client: StellarClient,
  params: BuildPaymentParams,
  options: BuildPaymentOptions = {}
): Promise<BuiltTx> {
  const account = await client.server.loadAccount(params.sourcePublicKey);
  const fee = options.fee ?? BASE_FEE;
  const timeoutSeconds = options.timeoutSeconds ?? 60;

  const builder = new TransactionBuilder(account, {
    fee,
    networkPassphrase: client.networkPassphrase,
  }).addOperation(
    Operation.payment({
      destination: params.destination,
      asset: params.asset as Asset,
      amount: params.amount,
    })
  );

  if (params.memo) builder.addMemo(params.memo as Memo);
  const transaction = builder.setTimeout(timeoutSeconds).build();

  return { transaction, xdr: transaction.toXDR() };
}

export async function submitSignedTx(
  client: StellarClient,
  signedXdr: string
): Promise<SubmitResult> {
  const tx = TransactionBuilder.fromXDR(
    signedXdr,
    client.networkPassphrase
  ) as Transaction;
  const res = await client.server.submitTransaction(tx);
  return {
    hash: res.hash,
    ledger: (res as any).ledger,
    resultXdr: (res as any).result_xdr,
  };
}
