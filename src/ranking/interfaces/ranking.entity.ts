import { User } from "src/user/interfaces/user.entity";

export class Ranking{
    dateMonthAndYear: string;
    personalRanks: PersonalRank[];
}

export class PersonalRank{
    userId: string;
    salesCount: number;
}