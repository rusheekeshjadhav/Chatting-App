import { Component } from '@angular/core';
import { ChannelService } from '../channel.service';
import { User } from '../user.component';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})

export class ChannelComponent {

  constructor(private cs: ChannelService) { }

  userflag: boolean = false;
  addflag!: boolean;

  warn: string = "";
  selectedUser: User | null = null;
  selectedUserName: string = "";
  id: number = 1;

  get Users() {
    return this.cs.Users;
  }

  get Messeges(){
    return this.cs.Messeges;
  }

  selected(user: User) {
    this.selectedUser = user;
    this.selectedUserName = user.userName;
  }

  reset(){
    this.selectedUser = null;
    this.selectedUserName = "";
  }

  send(user: User | null, mess: string) {
    if (user)
      this.cs.newMessege(user, mess, new Date());
    (<HTMLInputElement>document.getElementById("ipmess")).value = "";
  }

  save(username: string, password: string) {
    if (username && password) {
      this.addflag = true;
      this.warn = "";
      this.cs.Users.forEach(element => {
        if (element.userName === username) {
          this.warn = "Username already present !!!";
          this.addflag = false;
        }
      });

      if (this.addflag) {
        this.cs.Users.push({
          userId: this.id++,
          userName: username,
          password: password,
        });
        console.log(this.cs.Users);
        this.userflag = false;
      }

      (<HTMLInputElement>document.getElementById("ipuser")).value = "";
      (<HTMLInputElement>document.getElementById("ippass")).value = "";
    }
    else {
      this.warn = "Enter user data !!!";
    }
  }
}
