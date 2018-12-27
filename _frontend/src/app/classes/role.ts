import { User } from './user';
export interface Role {

  getId(): number;
  getPassword(): string;
  getUser(): User;
  getRole(): Role;
  toString(): string;
}
