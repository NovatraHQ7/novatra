import { Injectable } from "@nestjs/common";
import {
  createStellarClient,
  loadStellarConfig,
  listCorridors,
  type StellarClient,
} from "@novatra/stellar";

@Injectable()
export class StellarService {
  private readonly client: StellarClient;

  constructor() {
    const config = loadStellarConfig(process.env);
    this.client = createStellarClient(config);
  }

  listCorridors() {
    return listCorridors();
  }
}

