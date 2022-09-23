import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from 'src/sale/interfaces/sale.entity';
import { UserService } from 'src/user/user.service';
import { PersonalRank, Ranking } from './interfaces/ranking.entity';

@Injectable()
export class RankingService {

    constructor(
        private readonly userService: UserService,
        @InjectModel('Ranking') private readonly rankingModel: Model<Ranking>) { }

    async createMonthRanking(userId: string) {
        const date = new Date();
        const dateMonthAndYear = (date.getMonth() + 1) + "/" + date.getFullYear();

        const rankingExist = await this.rankingModel.findOne({ dateMonthAndYear }).exec();

        if (rankingExist) {
            throw new BadRequestException(`Ranking do mês ${dateMonthAndYear} já criado`);
        }

        const ranking = new Ranking();
        ranking.dateMonthAndYear = dateMonthAndYear;
        ranking.personalRanks = [];
        ranking.personalRanks.push(this.createAPersonalRanking(userId));

        const rankingCreated = new this.rankingModel(ranking);

        return await rankingCreated.save();
    }

    async updateRanking(sale: Sale) {
        const date = new Date();
        const dateMonthAndYear = (date.getMonth() + 1) + "/" + date.getFullYear();

        const rankingExist = await this.rankingModel.findOne({ dateMonthAndYear }).exec();
        const user = await this.userService.findByCheckoutId(sale.payload.source.pptc.checkout_id);

        if (!user) return;

        if (!rankingExist) {
            return await this.createMonthRanking(user.id);
        }

        let foundIndex = -1;

        rankingExist?.personalRanks.forEach((prank, index) => {
            if (prank.userId == user.id) {
                rankingExist.personalRanks[index].salesCount++;
                foundIndex = index;
            }
        });

        if (foundIndex < 0) {
            rankingExist.personalRanks.push(this.createAPersonalRanking(user.id));
        }

        await this.rankingModel.findOneAndUpdate({ dateMonthAndYear }, { $set: rankingExist }).exec();
        return rankingExist;
    }

    createAPersonalRanking(userId: string): PersonalRank {
        const personalRank = new PersonalRank();
        personalRank.salesCount = 1;
        personalRank.userId = userId;
        return personalRank;
    }


}
