import { Injectable } from "@angular/core";
import { Group } from "./group";
import { User } from "./user";

@Injectable({
  providedIn: "root"
})
export class Application {
  collect: Group[] = [{
    members: [],
    messeges: [],
    grName!: "General Channel"
  }];

  users: User[] = [];
}