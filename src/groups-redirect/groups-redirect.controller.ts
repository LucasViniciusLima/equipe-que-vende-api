import { Controller, Get, Post, Redirect, Body } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { GroupsRedirectService } from './groups-redirect.service';

@Controller('groups-redirect')
export class GroupsRedirectController {

    constructor(private readonly groupsRedirectService: GroupsRedirectService){        
    }

    @IsPublic()
    @Get("/redirect")
    @Redirect('https://chat.whatsapp.com')
    async redirectGroups() {        
        return await this.groupsRedirectService.redirect();
    }

    @IsPublic()
    @Post()
    async criarGrupo(@Body() groupDto){
        return await this.groupsRedirectService.saveGroup(groupDto);
    }
    

}
