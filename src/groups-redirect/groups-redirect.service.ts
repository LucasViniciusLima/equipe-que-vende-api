import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from './interfaces/group.entity';

@Injectable()
export class GroupsRedirectService {
    constructor(@InjectModel('group-schema') private readonly groupModel: Model<Group>) {
    }

    async saveGroup(groupDto: Group) {
        const newgroup = new this.groupModel(groupDto);
        return await newgroup.save();
    }

    async redirect() {
        const aggregation = [
            {
                '$match': {
                    'clicks': {
                        '$lte': 250
                    }
                }
            },
            {
                '$sort': { 'name': 1 as const }
            }
        ];

        const result = await this.groupModel.aggregate(aggregation).exec();
        const groupOne: Group = result[0];

        const doc = await this.groupModel.findOne({ name: groupOne.name });
        doc.clicks++;
        await doc.save();

        return { url: doc.link };
    }


}
