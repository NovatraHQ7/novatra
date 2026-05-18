import { Horizon, Networks } from "@stellar/stellar-sdk";
import type { StellarConfig } from "./types";

export type StellarClient = {
  server: Horizon.Server;
  networkPassphrase: string;
};

export function createStellarClient(config: StellarConfig): StellarClient {
  const server = new Horizon.Server(config.horizonUrl);
  const networkPassphrase =
    config.network === "public" ? Networks.PUBLIC : Networks.TESTNET;
  return { server, networkPassphrase };
}

