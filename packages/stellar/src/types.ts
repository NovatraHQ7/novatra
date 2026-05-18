import type { Asset, Memo, Transaction } from "@stellar/stellar-sdk";

export type HorizonUrl = string;

export type StellarConfig = {
  network: "testnet" | "public";
  horizonUrl: HorizonUrl;
};

export type BuildPaymentParams = {
  sourcePublicKey: string;
  destination: string;
  asset: Asset;
  amount: string;
  memo?: Memo;
};

export type BuiltTx = {
  transaction: Transaction;
  xdr: string;
};

export type SubmitResult = {
  hash: string;
  ledger?: number;
  resultXdr?: string;
};

export type CorridorId = string;

export type Corridor = {
  id: CorridorId;
  sourceCountry: string;
  destinationCountry: string;
  settlementAssetCode: string;
  settlementAssetIssuer?: string;
  notes?: string;
};

