import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { SaleModule } from './sale/sale.module';
import { RankingModule } from './ranking/ranking.module';
import { CategoriaDepoimentosModule } from './categoria-depoimentos/categoria-depoimentos.module';
import { DepoimentoFotoModule } from './depoimentos-foto/depoimento-foto.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://lucas_bezerra:MJ451CbLmZCnypom@cluster0.u0obv.mongodb.net/EquipeQueVende?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }),
    UserModule,
    AuthModule,
    SaleModule,
    RankingModule,
    CategoriaDepoimentosModule,
    DepoimentoFotoModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
