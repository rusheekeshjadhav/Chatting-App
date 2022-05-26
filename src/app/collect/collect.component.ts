import { Component } from '@angular/core';
import { CollectService } from '../collect.service';
import { Group } from '../group.component';
import { User } from '../user.component';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css'],
  providers: [CollectService]
})
export class CollectComponent {

  constructor(private cs: CollectService) { }

  selectedUser(){
    return this.cs.selectedUser
  }
  selectedUserName(){
    return this.cs.selectedUserName
  }
  selectedGroup(){
    return this.cs.selectedGroup
  }
  selectedGroupName(){
    return this.cs.selectedGroupName
  }

  selectUse(user: User) {
    this.cs.selectedUser = user;
    this.cs.selectedUserName = user.userName;
  }

  resetUse() {
    this.cs.selectedUser = null;
    this.cs.selectedUserName = "";
  }

  selectGro(group: Group) {
    this.cs.selectedGroup = group;
    this.cs.selectedGroupName = group.grName;
  }

  resetGro() {
    this.cs.selectedGroup = null;
    this.cs.selectedGroupName = "";
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
    this.cs.selectedUser = null;
    this.cs.selectedUserName = "";

    this.cs.userflag = true;
  }

  addUser(username: string, password: string) {
    this.cs.addUser(username, password);
    
    this.cs.selectedGroup = this.cs.collect[0];
    this.cs.selectedGroupName = this.cs.collect[0].grName;

    (<HTMLInputElement>document.getElementById("ipuser")).value = "";
    (<HTMLInputElement>document.getElementById("ippass")).value = "";
  }

  newGroup(){
    this.cs.selectedGroup = null;
    this.cs.selectedGroupName = "";

    this.cs.groupflag = true;
  }

  addChannel(chName: string, selectedUserName: string) {
    console.log(selectedUserName);
    this.cs.addChannel(chName, selectedUserName);
    (<HTMLInputElement>document.getElementById("ipch")).value = "";
  }

  addMessege(mess: string) {
    if (mess) this.cs.addMessege(this.cs.selectedGroupName, this.cs.selectedUserName, mess, new Date());
    else alert("Enter the messege !!!");
    (<HTMLInputElement>document.getElementById("ipmess")).value = "";
  }

}
