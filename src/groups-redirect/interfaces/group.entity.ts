import { Document } from "mongoose";

export class Group extends Document{
    clicks: number;
    name: string;
    link: string;
}