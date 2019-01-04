import { User } from "./User";

export interface IRuolo {
  equals(obj: object): boolean;
  getUser(): User;
}
