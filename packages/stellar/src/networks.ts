export const STELLAR_NETWORK_PASSPHRASE = {
  testnet: "Test SDF Network ; September 2015",
  public: "Public Global Stellar Network ; September 2015",
} as const;

export type StellarNetwork = keyof typeof STELLAR_NETWORK_PASSPHRASE;

