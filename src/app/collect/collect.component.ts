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

  constructor(private cs: CollectService, private ms: MessegeService, private appl: Application) { }

  get selectedUser(){
    return this.cs.selectedUser
  }
  get selectedUserName(){
    return this.cs.selectedUserName
  }
  get selectedGroup(){
    return this.cs.selectedGroup
  }
  get selectedGroupName(){
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
    this.cs.addUser(username, password);
    
    this.cs.selectedGroup = this.appl.collect[0];
    this.cs.selectedGroupName = this.appl.collect[0].grName;

    (<HTMLInputElement>document.getElementById("ipuser")).value = "";
    (<HTMLInputElement>document.getElementById("ippass")).value = "";
  }

  addChannel(chName: string, selectedUserName: string) {
    // console.log(selectedUserName);
    this.ms.addChannel(chName, selectedUserName);
    (<HTMLInputElement>document.getElementById("ipch")).value = "";
  }

  addMessege(mess: string) {
    if (mess) this.ms.addMessege(this.cs.selectedGroupName, this.cs.selectedUserName, mess, new Date());
    else alert("Enter the messege !!!");
    console.log(document.getElementById("ipmess"));
    (<HTMLInputElement>document.getElementById("ipmess")).value = "";
  }

  checkSub(): boolean{
    return this.ms.chechSub(this.cs.selectedUserName, this.cs.selectedGroupName);
  }

  subscribe(){
    this.ms.subscribe(this.cs.selectedUserName, this.cs.selectedGroupName);
    console.log(this.appl.collect);
  }

}
