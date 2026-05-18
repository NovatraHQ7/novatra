import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { StellarService } from "./stellar/stellar.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly stellarService: StellarService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/corridors")
  listCorridors() {
    return this.stellarService.listCorridors();
  }
}
