import { User } from "./user";

export class Messege{
    sender: User;
    messege: string;
    time: Date;

    constructor(user: User, mess: string, time: Date){
        this.sender = user;
        this.messege = mess;
        this.time = time;
    }
}