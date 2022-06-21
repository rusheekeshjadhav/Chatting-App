import { Component, OnInit } from '@angular/core';
import { CollectService } from '../collect.service';
import { MessegeService } from '../messege.service';

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
  messeges: any = [];

  subFlag: boolean = true;

  constructor(private cs: CollectService, private ms: MessegeService) { }

  ngOnInit(): void { }

  selectGro(group: any) {
    this.selectedGroup = group;
    this.selectedGroupName = group.channelname;
    this.checkSub();
    this.getMessegesByChannelId();
  }

  get GroupFlag() {
    return this.ms.groupflag;
  }

  setGroupFlag(flag: boolean) {
    this.ms.groupflag = flag;
  }

  addUser(username: string, password: string) {
    this.cs.addUser(username, password).subscribe((data: any) => {
      this.selectedUser = data;
      this.selectedUserName = data.username;

      this.getChannels();
    });
  }

  addChannel(chName: string) {
    this.ms.addChannel(chName).subscribe((data: any) => {
      this.selectedGroup = data;
      this.selectedGroupName = data.channelname;

      this.getChannels();
    });
    (<HTMLInputElement>document.getElementById("ipch")).value = "";
  }

  getChannels(): any {
    this.ms.getChannels().subscribe((data: any) => {
      this.channels = data;
      this.selectedGroup = this.channels[0];
      this.selectedGroupName = this.channels[0].channelname;
      this.getMessegesByChannelId();
    });
  }

  getMessegesByChannelId(): any {
    if (this.selectedGroup != null)
      this.ms.getMessegesByChannelId(this.selectedGroup.channelid).subscribe((data: any) => {
        this.messeges = data;
      });
  }

  // getUserChannelsByChannelId(): any {
  //   if (this.selectedGroup != null)
  //     this.ms.getUserChannelsByChannelId(this.selectedGroup.channelid).subscribe((data: any) => {
  //       this.userchannels = data;
  //     });
  // }

  addMessege(mess: string) {
    if (mess)
      this.ms.addMessege(this.selectedGroup.channelid, this.selectedUser.userid, mess, new Date()).subscribe((data: any) => {
        this.getMessegesByChannelId();
      });
    else alert("Enter the messege !!!");
    (<HTMLInputElement>document.getElementById("ipmess")).value = "";
  }

  checkSub() {
    let uc: any;
    if (this.selectedGroup != null)
      this.ms.getUserChannelsByChannelId(this.selectedGroup.channelid).subscribe((data: any) => {
        this.userchannels = data;
        uc = this.userchannels.find((element: { userid: any; }) => element.userid === this.selectedUser.userid);
        if (uc == null)
          this.subFlag = false;
        else this.subFlag = true;
      });
  }

  subscribeCh() {
    this.ms.subscribeCh(this.selectedGroup.channelid, this.selectedUser.userid).subscribe((data: any) => {
      this.checkSub();
    });
  }

  unsubscribe() {
    // this.ms.unsubscribe(this.selectedUserName, this.selectedGroupName);
    console.log("pending");
  }

}
