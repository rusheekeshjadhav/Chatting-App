import { Injectable } from '@angular/core';
import { Group } from './group.component';
import { User } from './user.component';

@Injectable()
export class CollectService {

  constructor() { }

  collect: Group[] = [{
    members: [],
    messeges: [],
    grName!: "General Channel"
  }];

  users: User[] = [];

  userflag: boolean = false;
  addflag!: boolean;

  groupflag: boolean = false;
  grflag!: boolean;

  selectedUser: User | null = null;
  selectedUserName: string = "";

  selectedGroup: Group | null = null;
  selectedGroupName: string = "";

  addUser(username: string, password: string) {
    if (username && password) {
      this.addflag = true;
      this.users.forEach(element => {
        if (element.userName === username) {
          alert("Duplicate User Name !!!");
          this.addflag = false;
        }
      });

      if (this.addflag) {
        this.users.push({
          userName: username,
          password: password,
        });

        this.collect[0].members.push({
          userName: username,
          password: password,
        });

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
  }

  addChannel(chName: string, selectedUserName: string) {
    if (chName) {
      this.grflag = true;
      this.collect.forEach(element => {
        if (element.grName === chName) {
          alert("Duplicate Channel Name !!!")
          this.grflag = false;
        }
      });

      if (this.grflag) {
        let use: User | any = this.users.find(element => element.userName === selectedUserName);
        console.log(use);

        this.collect.push({
          grName: chName,
          members: [use],
          messeges: []
        })
        // console.log(this.collect);
        this.groupflag = false;
      }
    }
    else alert("Enter channel name !!!");
  }

  addMessege(selectedGroupName: string, selectedUserName: string, mess: string, time: Date) {
    let use: User | any = this.users.find(element => element.userName === selectedUserName);
    let grp: Group | any = this.collect.find(element => element.grName === selectedGroupName);
    grp.messeges.push({
      sender: use,
      messege: mess,
      time: time
    });

    console.log(grp);
  }
}
