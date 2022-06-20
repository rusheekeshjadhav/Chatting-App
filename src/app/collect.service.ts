import { Injectable } from '@angular/core';
import { Application } from './application.service';
import { Group } from './group';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const USER = 'https://localhost:44349/api/UserTable';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class CollectService {

  constructor(private http: HttpClient) { }

  userflag: boolean = false;
  addflag!: boolean;

  selectedGroup!: Group;
  selectedGroupName!: string;

  addUser(username: string, password: string): any {
    if (username && password) {
      this.addflag = true;
      this.userflag = false;
      return this.http.post(USER, { "Username": username, "Passwords": password }, httpOptions);
    }
    else {
      alert("Please enter the data");
      return null;
    }
  }

  getUsers(): any{
    return this.http.get(USER);
  }

  // addUser(username: string, password: string) {
  //   if (username && password) {
  //     this.addflag = true;
  //     this.appl.users.forEach(element => {
  //       if (element.userName === username) {
  //         alert("Duplicate User Name !!!");
  //         this.addflag = false;
  //       }
  //     });

  //     if (this.addflag) {
  //       this.appl.users.push({
  //         userName: username,
  //         password: password,
  //       });

  //       // console.log(this.appl.users);

  //       this.appl.collect[0].members.push({
  //         userName: username,
  //         password: password,
  //       });

  //       // console.log(this.collect);

  //       this.selectedUser = {
  //         userName: username,
  //         password: password,
  //       };
  //       this.selectedUserName = username;
  //       // console.log(this.users);
  //       this.userflag = false;
  //     }
  //   }
  //   else alert("Enter user data !!!");
  //   // console.log(this.users);
  // }

}
