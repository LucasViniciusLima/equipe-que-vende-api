import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://lucas_bezerra:MJ451CbLmZCnypom@cluster0.u0obv.mongodb.net/EquipeQueVende?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }),
    SellerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
