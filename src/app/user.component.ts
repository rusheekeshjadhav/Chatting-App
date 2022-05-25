export class User{
    userId: number;
    userName: string;
    password: string;

    constructor(id: number, name: string, pass: string){
        this.userId = id;
        this.userName = name;
        this.password = pass;
    }
}