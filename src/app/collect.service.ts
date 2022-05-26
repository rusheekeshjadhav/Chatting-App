import { Injectable } from '@angular/core';
import { Application } from './application.component';
import { Group } from './group.component';
import { User } from './user.component';

@Injectable()
export class CollectService {

  constructor(private appl: Application) { }

  userflag: boolean = false;
  addflag!: boolean;

  selectedUser: User | null = null;
  selectedUserName: string = "";

  selectedGroup!: Group;
  selectedGroupName!: string;

  addUser(username: string, password: string) {
    if (username && password) {
      this.addflag = true;
      this.appl.users.forEach(element => {
        if (element.userName === username) {
          alert("Duplicate User Name !!!");
          this.addflag = false;
        }
      });

      if (this.addflag) {
        this.appl.users.push({
          userName: username,
          password: password,
        });

        // console.log(this.appl.users);

        this.appl.collect[0].members.push({
          userName: username,
          password: password,
        });

        // console.log(this.collect);

        this.selectedUser = {
          userName: username,
          password: password,
        };
        this.selectedUserName = username;
        // console.log(this.users);
        this.userflag = false;
      }
    }
    else alert("Enter user data !!!");
    // console.log(this.users);
  }
}
