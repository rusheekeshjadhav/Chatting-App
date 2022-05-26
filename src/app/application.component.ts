import { Injectable } from "@angular/core";
import { Group } from "./group.component";
import { User } from "./user.component";

@Injectable({
  providedIn: "root"
})
export class Application{
    collect: Group[] = [{
        members: [],
        messeges: [],
        grName!: "General Channel"
      }];
    
      users: User[] = [];
}