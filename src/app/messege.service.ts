import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Application } from "./application.service";
import { CollectService } from "./collect.service";
import { Group } from "./group";
import { User } from "./user";

const CHANNEL = 'https://localhost:44349/api/ChannelTable';
const USER_CHANNEL_BY_CHANNELID = 'https://localhost:44349/api/UserChannel/ByChannel';
const ADD_USER_CHANNEL = 'https://localhost:44349/api/UserChannel';
const DELETE_USER_CHANNEL = 'https://localhost:44349/api/UserChannel/delete';
const MESSEGE_BY_CHANNELID = 'https://localhost:44349/api/MessegeTable/ByChannel';
const ADD_MESSEGE = 'https://localhost:44349/api/MessegeTable';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: "root"
})
export class MessegeService {

  constructor(private appl: Application, private http: HttpClient) { }

  groupflag: boolean = false;
  grflag!: boolean;
  subflag: boolean = true;

  addChannel(chName: string, userid: number): any {
    if (chName) {
      this.grflag = true;
      this.groupflag = false;
      let ac = CHANNEL + "/" + userid;
      return this.http.post(ac, { "Channelname": chName }, httpOptions);
    }
    else {
      alert("Please enter the data");
      return null;
    }
  }

  getChannels() {
    return this.http.get(CHANNEL);
  }

  getMessegesByChannelId(id: number) {
    var mt = MESSEGE_BY_CHANNELID + "/" + id;
    return this.http.get(mt);
  }

  getUserChannelsByChannelId(id: number) {
    var uc = USER_CHANNEL_BY_CHANNELID + "/" + id;
    return this.http.get(uc);
  }

  subscribeCh(chId: number, usId: number) {
    return this.http.post(ADD_USER_CHANNEL, { "Channelid": chId, "Userid": usId }, httpOptions);
  }

  unsubscribeCh(chId: number, usId: number) {
    return this.http.post(DELETE_USER_CHANNEL, { "Channelid": chId, "Userid": usId }, httpOptions);
  }

  addMessege(chId: number, usId: number, mess: string, time: Date) {
    return this.http.post(ADD_MESSEGE, { "Channelid": chId, "Senderid": usId, "Messege": mess, "Time": time }, httpOptions);
  }
}