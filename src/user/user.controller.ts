import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.entity';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {

    constructor(private readonly userService:UserService) {}


    @IsPublic()
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUserDto:CreateUserDto ): Promise<User>{
        return await this.userService.create(createUserDto);
    }
    
}
