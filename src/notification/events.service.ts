import { Injectable } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Injectable()
export class EventsService {
  constructor(private readonly eventsGateway: EventsGateway) {}

  async addEvent(eventData: any) {
    // Save event to database
    const savedEvent = await this.saveToDatabase(eventData);

    // Notify connected clients
    this.eventsGateway.notifyUsers(savedEvent);

    return savedEvent;
  }

  private async saveToDatabase(eventData: any) {
    // Replace this mock with your actual database logic
    return { ...eventData, _id: '12345', createdAt: new Date() };
  }
}
