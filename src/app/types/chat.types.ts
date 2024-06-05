import { IUser } from "./user.types";

export interface IMessage {
  id: string;
  text: string;
  createAt: string;
  sender: IUser;
}

export interface IChat {
  id: string;
  messages: IMessage[];
  participants: IUser[];
}

export interface IStrapiResponsive<T> {
  attributes: T;
  id: number;
}

export interface IStrapiChat {
  messages: { data: IStrapiResponsive<IMessage>[] };
  participants: { data: IStrapiResponsive<IUser>[] };
}


