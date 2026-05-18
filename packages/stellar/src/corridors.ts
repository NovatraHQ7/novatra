import type { Corridor, CorridorId } from "./types";

const corridors: Record<CorridorId, Corridor> = {
  "uk-ng": {
    id: "uk-ng",
    sourceCountry: "GB",
    destinationCountry: "NG",
    settlementAssetCode: "USDC",
    notes:
      "MVP reference corridor. Settlement asset/issuer to be finalized per anchor/liquidity provider.",
  },
};

export function listCorridors(): Corridor[] {
  return Object.values(corridors);
}

export function getCorridor(id: CorridorId): Corridor | undefined {
  return corridors[id];
}

