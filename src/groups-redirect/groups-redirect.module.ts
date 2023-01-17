import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsRedirectController } from './groups-redirect.controller';
import { GroupsRedirectService } from './groups-redirect.service';
import { groupSchema } from './interfaces/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'group-schema', schema: groupSchema }])    
  ],
  controllers: [GroupsRedirectController],
  providers: [GroupsRedirectService]
})
export class GroupsRedirectModule {}
