import { Component } from '@angular/core';
import { Application } from '../application.component';
import { CollectService } from '../collect.service';
import { Group } from '../group.component';
import { MessegeService } from '../messege.service';
import { User } from '../user.component';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css'],
  providers: [CollectService]
})
export class CollectComponent {

  constructor(private cs: CollectService, private ms: MessegeService, private appl: Application) { }

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
    return this.cs.selectedGroupName;
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

  // resetGro() {
  //   this.cs.selectedGroup = null;
  //   this.cs.selectedGroupName = "";
  // }

  get UserFlag() {
    return this.cs.userflag;
  }

  setUserFlag(flag: boolean) {
    this.cs.userflag = flag;
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

  newUser(){
    this.cs.selectedUser = null;
    this.cs.selectedUserName = "";

    this.cs.userflag = true;
  }

  addUser(username: string, password: string) {
    this.cs.addUser(username, password);
    
    this.cs.selectedGroup = this.appl.collect[0];
    this.cs.selectedGroupName = this.appl.collect[0].grName;

    (<HTMLInputElement>document.getElementById("ipuser")).value = "";
    (<HTMLInputElement>document.getElementById("ippass")).value = "";
  }

  newGroup(){
    this.ms.groupflag = true;
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
