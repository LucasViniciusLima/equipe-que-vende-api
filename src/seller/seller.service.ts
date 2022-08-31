import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSellerDto } from './dto/create-seller.dto';
import { Seller } from './interfaces/seller.entity';

@Injectable()
export class SellerService {
    constructor(@InjectModel('Seller') private readonly sellerModel: Model<Seller>) {}


    async create(createSellerDto:CreateSellerDto): Promise<Seller>{
        const sellerExists = await this.findByEmail(createSellerDto.email);

        if(sellerExists) {
            throw new BadRequestException(`Usuario já existe`);
        }

        const newSeller = new this.sellerModel({
            ...createSellerDto,
            //password: await bcrypt.hash(createSellerDto.password, 10)
        });

        await newSeller.save();

        newSeller.password =  undefined;

        return newSeller;

    }


    findByEmail(email: string){
        return this.sellerModel.findOne({ email });
    }

}
