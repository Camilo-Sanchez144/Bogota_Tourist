import { Event } from "./Event.entity";
import User from "../User/User.entity";
export class EventService {

    async getEvents() {
        return await Event.find({where: { is_active: true },order: { date: "ASC" }});
    }

    async getEventById(eventId: number) {
        const event = await Event.findOne({where: { id: eventId, is_active: true },relations: ['eventParticipant.user']});
        if (!event) throw new Error('Evento no existe');

        return event;
    }

    async createEvent(data: any, userId:number) {
        const user = await User.findOne({ where: { id: userId, status: 1 } });
        if(!user){
            throw new Error('No se encontró el usuario')
        }
        const event = new Event();
        event.title = data.title;
        event.user = user
        event.description = data.description;
        event.location = data.location;
        event.date = data.date;
        event.max_people = data.max_people;
        event.current_people = 0;
        event.price = data.price ?? 0;
        event.is_active = true;

        await event.save();

        return event;
    }
    async editEvent(userId:number, eventId:number, data:any){
        const event = await Event.findOne({ where:{ id: eventId, is_active: true, user: { id: userId, status:1 }},});
        if(!event){
            throw new Error('No se encontró el evento')
        }
        event.title = data.title ?? event.title;
        event.description = data.description ?? event.description;
        event.location = data.location ?? event.location;
        event.max_people = data.max_people ?? event.max_people;
        event.date = data.date ?? event.date;
        event.price = data.price ?? event.price;

        await event.save();

        return event;
    }
    async deleteEvent(eventId: number, userId:number) {
        const event = await Event.findOne({ where: { id: eventId, is_active:true, user: { id: userId, status:1 }} });
        if (!event) throw new Error('Evento no existe o no pertenece al usuario');
        event.is_active = false
        await event.save();
        return event;
    }
}