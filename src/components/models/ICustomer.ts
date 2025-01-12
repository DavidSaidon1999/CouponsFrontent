import { IUser } from "./IUser";

export interface ICustomer {
    id: number;
    name: string;
    address: string;
    phone: string;
    amountOfKids: number;
    user: IUser;
  }
  