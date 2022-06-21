import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Application } from "./application.service";
import { CollectService } from "./collect.service";
import { Group } from "./group";
import { User } from "./user";

const CHANNEL = 'https://localhost:44349/api/ChannelTable';
const USER_CHANNEL_BY_CHANNELID = 'https://localhost:44349/api/UserChannel/ByChannel';
const ADD_USER_CHANNEL = 'https://localhost:44349/api/UserChannel'
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: "root"
})
export class MessegeService {

  constructor(private appl: Application, private http: HttpClient) { }

  groupflag: boolean = false;
  grflag!: boolean;
  subflag: boolean = true;

  addChannel(chName: string): any {
    if (chName) {
      this.grflag = true;
      this.groupflag = false;
      return this.http.post(CHANNEL, { "Channelname": chName }, httpOptions);
    }
    else {
      alert("Please enter the data");
      return null;
    }
  }

  getChannels(){
    return this.http.get(CHANNEL);
  }

  getUserChannelsByChannelId(id: number){
    var uc = USER_CHANNEL_BY_CHANNELID + "/" +id;
    return this.http.get(uc);
  }

  subscribeCh(chId: number, usId: number) {
    return this.http.post(ADD_USER_CHANNEL, { "Channelid": chId, "Userid": usId }, httpOptions);
  }




  // addChannel(chName: string, selectedUserName: string) {
  //   if (chName) {
  //     this.grflag = true;
  //     this.appl.collect.forEach(element => {
  //       if (element.grName === chName) {
  //         alert("Duplicate Channel Name !!!")
  //         this.grflag = false;
  //       }
  //     });

  //     if (this.grflag) {
  //       let use: User | any = this.appl.users.find(element => element.userName === selectedUserName);
  //       // console.log(use);

  //       this.appl.collect.push({
  //         grName: chName,
  //         members: [use],
  //         messeges: []
  //       })
  //       // console.log(this.appl.collect);
  //       this.groupflag = false;
  //     }
  //   }
  //   else alert("Enter channel name !!!");
  // }

  addMessege(selectedGroupName: string, selectedUserName: string, mess: string, time: Date) {
    // console.log(this.appl.users);

    let use: User | any = this.appl.users.find(element => element.userName === selectedUserName);
    let grp: Group | any = this.appl.collect.find(element => element.grName === selectedGroupName);
    // console.log(use);
    grp.messeges.push({
      sender: use,
      messege: mess,
      time: time
    });
    // console.log(grp);
    // console.log(this.appl.collect);
  }

  // chechSub(selectedUserName: string, selectedGroupName: string): boolean {

  //   if (selectedUserName && selectedGroupName) {
  //     let grp: Group | any = this.appl.collect.find(element => element.grName === selectedGroupName);

  //     if (grp.members.find((element: { userName: string; }) => element.userName === selectedUserName)) {
  //       return false;
  //     }
  //     else return true;
  //   }
  //   else return false;
  // }

  // subscribe(selectedUserName: string, selectedGroupName: string) {
  //   let use: User | any = this.appl.users.find(element => element.userName === selectedUserName);
  //   let grp: Group | any = this.appl.collect.find(element => element.grName === selectedGroupName);

  //   if ((grp.members.find((element: { userName: string; }) => element.userName === selectedUserName)) === undefined) {
  //     grp.members.push({
  //       userName: use.userName,
  //       password: use.password
  //     });
  //   }
  //   // console.log(grp.members);
  // }

  unsubscribe(selectedUserName: string, selectedGroupName: string){
    // let use: User | any = this.appl.users.find(element => element.userName === selectedUserName);
    let grp: Group | any = this.appl.collect.find(element => element.grName === selectedGroupName);

    console.log(grp.members);

    grp.members.forEach((value: User, index: number) => {
      if(value.userName === selectedUserName)
        grp.members.splice(index, 1);
    });

    console.log(grp.members);
  }
}