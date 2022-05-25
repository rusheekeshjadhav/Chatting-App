import { Injectable } from '@angular/core';
import { Messege } from './messege.component';
import { User } from './user.component';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor() { }

  private users: User[] = [];
  private messeges: Messege[] = [];

  get Users(){
    return this.users;
  }

  get Messeges(){
    return this.messeges;
  }

  newMessege(user: User, mess: string, time: Date) {
    this.messeges.push({
      sender: user,
      messege: mess,
      time: time
    })
  }
}
