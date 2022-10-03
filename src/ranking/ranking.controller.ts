import { Controller, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('api/v1/ranking')
export class RankingController {

    constructor(private readonly rankingService: RankingService) { }
    
    @Get()
    async getRanking(){
        return await this.rankingService.getRanking();
    }
}
