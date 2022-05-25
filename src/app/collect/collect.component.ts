import { Component } from '@angular/core';
import { CollectService } from '../collect.service';
import { Group } from '../group.component';
import { User } from '../user.component';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent {

  constructor(private cs: CollectService) { }

  selectedUser: User | null = null;
  selectedUserName: string = "";

  selectedGroup: Group | null = null;
  selectedGroupName: string = "";

  selectUse(user: User) {
    this.selectedUser = user;
    this.selectedUserName = user.userName;
  }

  resetUse() {
    this.selectedUser = null;
    this.selectedUserName = "";
  }

  selectGro(group: Group) {
    this.selectedGroup = group;
    this.selectedGroupName = group.grName;
  }

  resetGro() {
    this.selectedGroup = null;
    this.selectedGroupName = "";
  }

  get UserFlag() {
    return this.cs.userflag;
  }

  setUserFlag(flag: boolean) {
    this.cs.userflag = flag;
  }

  get GroupFlag() {
    return this.cs.groupflag;
  }

  setGroupFlag(flag: boolean) {
    this.cs.groupflag = flag;
  }

  get User() {
    return this.cs.users;
  }

  get Group() {
    return this.cs.collect;
  }

  newUser(){
    this.selectedUser = null;
    this.selectedUserName = "";

    this.cs.userflag = true;
  }

  addUser(username: string, password: string) {
    this.cs.addUser(username, password);
    (<HTMLInputElement>document.getElementById("ipuser")).value = "";
    (<HTMLInputElement>document.getElementById("ippass")).value = "";
  }

  newGroup(){
    this.selectedGroup = null;
    this.selectedGroupName = "";

    this.cs.groupflag = true;
  }

  addChannel(chName: string, selectedUserName: string) {
    console.log(selectedUserName);
    this.cs.addChannel(chName, selectedUserName);
    (<HTMLInputElement>document.getElementById("ipch")).value = "";
  }

  addMessege(mess: string) {
    if (mess) this.cs.addMessege(this.selectedGroupName, this.selectedUserName, mess, new Date());
    else alert("Enter the messege !!!");
    (<HTMLInputElement>document.getElementById("ipmess")).value = "";
  }

}
