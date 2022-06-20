import { Component, OnInit } from '@angular/core';
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
export class CollectComponent implements OnInit {

  selectedUserName: string = "";
  selectedUser: any;

  selectedGroupName: string = "";
  selectedGroup: any;

  channels: any = [];
  userchannels: any = [];

  constructor(private cs: CollectService, private ms: MessegeService, private appl: Application) { }

  ngOnInit(): void {
    this.getChannels();
    this.getUserChannelsByChannelId();
  }

  selectGro(group: any) {
    this.selectedGroup = group;
    this.selectedGroupName = group.channelname;
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

      this.selectedGroup = this.channels[0];
      this.selectedGroupName = this.channels[0].channelname;
    });
  }

  addChannel(chName: string) {
    this.ms.addChannel(chName).subscribe((data: any) => {
      this.selectedGroup = data;
      this.selectedGroupName = data.channelname;

      this.getChannels();
      this.getUserChannelsByChannelId();
    });
    (<HTMLInputElement>document.getElementById("ipch")).value = "";
  }

  getChannels(): any {
    this.ms.getChannels().subscribe((data: any) => {
      this.channels = data;
    });
  }

  getUserChannelsByChannelId(): any {
    if (this.selectedGroup != null)
      this.ms.getUserChannelsByChannelId(this.selectedGroup.channelid).subscribe((data: any) => {
        this.userchannels = data;
        console.log(this.selectedGroup.channelid);
        console.log(data);
      });
  }

  addMessege(mess: string) {
    if (mess) this.ms.addMessege(this.selectedGroupName, this.selectedUserName, mess, new Date());
    else alert("Enter the messege !!!");
    console.log(document.getElementById("ipmess"));
    (<HTMLInputElement>document.getElementById("ipmess")).value = "";
  }

  checkSub(): boolean {
    let uc = this.userchannels.find((element: { channelid: any; }) => element.channelid === this.selectedGroup.channelid);
    if (uc == null)
      return false;
    else return true;
  }

  subscribe() {
    this.ms.subscribe(this.selectedUserName, this.selectedGroupName);
    // console.log(this.appl.collect);
  }

  unsubscribe() {
    this.ms.unsubscribe(this.selectedUserName, this.selectedGroupName);
  }

}
