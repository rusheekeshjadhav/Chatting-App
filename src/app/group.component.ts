import { Messege } from "./messege.component";
import { User } from "./user.component";

export class Group{
    members: User[] = [];
    messeges: Messege[] = [];
    grName!: string;

    constructor(name: string){
        this.grName = name;
    }
}