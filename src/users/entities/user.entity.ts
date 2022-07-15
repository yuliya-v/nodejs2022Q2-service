import { v4 } from 'uuid';

// interface IUser {
//   id: string; // uuid v4
//   login: string;
//   password: string;
//   version: number; // integer number, increments on update
//   createdAt: number; // timestamp of creation
//   updatedAt: number; // timestamp of last update
// }

export class User {
  public readonly id: string; // uuid v4
  public login: string;
  public password: string;
  public version: number; // integer number, increments on update
  public readonly createdAt: number; // timestamp of creation
  public updatedAt: number; // timestamp of last update

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.id = v4();
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.version = 1;
  }
}
