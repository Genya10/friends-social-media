import { IUser } from "./user.types";

export interface IMessage {
  id: number;
  text: string;
  createAt: string;
  sender: IUser;
}

export interface IChat {
  id: number;
  messages: IMessage[];
  participants: IUser[];
}

export interface IStrapiChat {
  id: number,
  messages: { data: IMessage[] };
  participants: { data: IUser[] };
}


