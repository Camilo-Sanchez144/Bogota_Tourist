import { Usuario } from './Usuario';
export interface IEvent{
    created_at: Date;
    current_people: number;
    date: Date;
    description:string;
    id:number;
    is_active:boolean;
    location:string;
    max_people: number;
    user: Usuario;
    price: number;
    title:string;
}
export interface IEventParticipant{
    user: Usuario;
    event: IEvent;
    status: string;
    id : number;
    created_at: Date
}