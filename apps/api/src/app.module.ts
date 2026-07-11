import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StellarModule } from './stellar/stellar.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, StellarModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
