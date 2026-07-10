import { Event } from "../Events/Event.entity";
import { EventParticipant, EventStatus } from "./EventParticipant.entity";
import User from "../User/User.entity";
import { AppDataSource } from "../db/conexion";

export class EventParticipantService {

    async joinEvent(userId: number, eventId: number) {

        const queryRunner = AppDataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const user = await queryRunner.manager.findOne(User, {
                where: { id: userId, status:1 }
            });

            if (!user) throw new Error('Usuario no existe');

            const event = await queryRunner.manager.findOne(Event, {
                where: { id: eventId }
            });

            if (!event) throw new Error('Evento no existe');

            if (!event.is_active) {
                throw new Error('Evento no disponible');
            }
            
            const existing = await queryRunner.manager.findOne(EventParticipant, {
                where: {
                    user: { id: userId },
                    event: { id: eventId }
                }
            });

            if (existing) {
                throw new Error('Ya estás inscrito en este evento');
            }

            if (event.current_people >= event.max_people) {
                throw new Error('Evento lleno');
            }

            const participant = new EventParticipant();
            participant.user = user;
            participant.event = event;
            participant.status = EventStatus.CONFIRMED;

            await queryRunner.manager.save(participant);

            event.current_people += 1;
            await queryRunner.manager.save(event);

            await queryRunner.commitTransaction();

            return participant;

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async leaveEvent(userId: number, eventId: number) {

        const queryRunner = AppDataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const participant = await queryRunner.manager.findOne(EventParticipant, {
                where: {
                    user: { id: userId, status:1 },
                    event: { id: eventId, is_active:true }
                },
                relations: ['event']
            });

            if (!participant) {
                throw new Error('No estás inscrito en este evento');
            }

            const event = participant.event;

            await queryRunner.manager.remove(participant);
            if (event.current_people > 0) {
                event.current_people -= 1;
                await queryRunner.manager.save(event);
            }

            await queryRunner.commitTransaction();

            return { message: 'Saliste del evento' };

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
    async getEventsByUserParticipant(userId: number) {
        const participants = await EventParticipant.find({
            where: {
                user: { id: userId },
                status: EventStatus.CONFIRMED,
                event: { is_active: true }
            },
            relations: ['event', 'event.user']
        });

        return participants.map((participant) => participant.event);
    }
    
}