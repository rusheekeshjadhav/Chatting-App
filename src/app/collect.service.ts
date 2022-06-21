import { Injectable } from '@angular/core';
import { Application } from './application.service';
import { Group } from './group';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const USER = 'https://localhost:44349/api/UserTable';
const USER_BY_NAME = 'https://localhost:44349/api/UserTable/ByName';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class CollectService {

  constructor(private http: HttpClient) { }

  userflag: boolean = false;
  addflag!: boolean;

  addUser(username: string, password: string): any {
    this.addflag = true;
    this.userflag = false;
    return this.http.post(USER, { "Username": username, "Passwords": password }, httpOptions);
  }

  getUsers(): any {
    return this.http.get(USER);
  }

  getUserByName(name: string): any {
    let un = USER_BY_NAME + "/" + name;
    return this.http.get(un);
  }
}
