import { Messege } from "./messege";
import { User } from "./user";

export class Group {
    members: User[] = [];
    messeges: Messege[] = [];
    grName!: string;

    constructor(name: string) {
        this.grName = name;
    }
}