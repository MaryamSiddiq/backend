// src/events/events.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { EventsController } from './event.controller';
import { EventsService } from './event.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
