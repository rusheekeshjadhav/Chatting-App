import { Component } from '@angular/core';
import { Application } from '../application.service';
import { CollectService } from '../collect.service';
import { Group } from '../group';
import { MessegeService } from '../messege.service';
import { User } from '../user';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css'],
  providers: [CollectService]
})
export class CollectComponent {

  selectedUserName: string = "";
  selectedUser: any;

  constructor(private cs: CollectService, private ms: MessegeService, private appl: Application) { }

  get selectedGroup() {
    return this.cs.selectedGroup
  }
  get selectedGroupName() {
    return this.cs.selectedGroupName;
  }

  selectGro(group: Group) {
    this.cs.selectedGroup = group;
    this.cs.selectedGroupName = group.grName;
  }

  get GroupFlag() {
    return this.ms.groupflag;
  }

  setGroupFlag(flag: boolean) {
    this.ms.groupflag = flag;
  }

  get User() {
    return this.appl.users;
  }

  get Group() {
    return this.appl.collect;
  }

  addUser(username: string, password: string) {
    this.cs.addUser(username, password).subscribe((data: any) => {
      this.selectedUser = data;
      this.selectedUserName = data.username;
    });

    this.cs.selectedGroup = this.appl.collect[0];
    this.cs.selectedGroupName = this.appl.collect[0].grName;
  }

  addChannel(chName: string) {
    this.ms.addChannel(chName).subscribe((data: any) => {
      console.log(data);
    });
    (<HTMLInputElement>document.getElementById("ipch")).value = "";
  }

  addMessege(mess: string) {
    if (mess) this.ms.addMessege(this.cs.selectedGroupName, this.selectedUserName, mess, new Date());
    else alert("Enter the messege !!!");
    console.log(document.getElementById("ipmess"));
    (<HTMLInputElement>document.getElementById("ipmess")).value = "";
  }

  checkSub(): boolean {
    return this.ms.chechSub(this.selectedUserName, this.cs.selectedGroupName);
  }

  subscribe() {
    this.ms.subscribe(this.selectedUserName, this.cs.selectedGroupName);
    // console.log(this.appl.collect);
  }

  unsubscribe() {
    this.ms.unsubscribe(this.selectedUserName, this.cs.selectedGroupName);
  }

}
