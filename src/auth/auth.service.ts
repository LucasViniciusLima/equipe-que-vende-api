import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { Seller } from 'src/seller/interfaces/seller.entity';
import { SellerService } from 'src/seller/seller.service';
import { SellerPayload } from './models/SellerPayload';
import { SellerToken } from './models/SellerToken';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly sellerService: SellerService
    ) { }

    async login(seller: Seller): Promise<SellerToken> {
        const payload: SellerPayload = {
            sub: seller.id,
            email: seller.email,
            name: seller.name
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateSeller(email: string, password: string): Promise<Seller> {
        const seller = await this.sellerService.findByEmail(email);

        const isPasswordValid = await bcrypt.compare(password, seller.password);

        if (isPasswordValid) {
            return {
                ...seller,
                password: undefined
            };
        }

        throw new UnauthorizedError('Email address or password provided is incorrect.');
    }
}
