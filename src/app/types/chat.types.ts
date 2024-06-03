import {IUser} from './user.types';

export interface IMessage { 
  id: string
  text: string
  createAt: string
  sender: IUser
}

export interface IChat {
    id:string
    messages:IMessage[]
    participants: IUser[]
}