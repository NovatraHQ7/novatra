import type { StellarConfig } from "./types";
import { STELLAR_NETWORK_PASSPHRASE, type StellarNetwork } from "./networks";

export type StellarEnv = Partial<{
  NOVATRA_STELLAR_NETWORK: StellarNetwork;
  NOVATRA_HORIZON_URL: string;
}>;

export function loadStellarConfig(env: StellarEnv = process.env): StellarConfig {
  const network = (env.NOVATRA_STELLAR_NETWORK ?? "testnet") as StellarNetwork;
  if (!(network in STELLAR_NETWORK_PASSPHRASE)) {
    throw new Error(
      `Invalid NOVATRA_STELLAR_NETWORK: ${String(
        env.NOVATRA_STELLAR_NETWORK
      )}. Expected 'testnet' or 'public'.`
    );
  }

  const horizonUrl =
    env.NOVATRA_HORIZON_URL ??
    (network === "public"
      ? "https://horizon.stellar.org"
      : "https://horizon-testnet.stellar.org");

  return { network, horizonUrl };
}

