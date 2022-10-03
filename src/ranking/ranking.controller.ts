import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('api/v1/ranking')
export class RankingController {

    constructor(private readonly rankingService: RankingService) { }
    
    @Get('/:date')    
    async getRanking(@Param() params: any){
        return await this.rankingService.getRanking(params.date);
    }
}
