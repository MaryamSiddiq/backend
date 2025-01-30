// src/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,
  ) {}

  async create(data: any): Promise<Event> {
    const newEvent = new this.eventModel(data);
    return newEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: string, data: any): Promise<Event> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return updatedEvent;
  }

  async remove(id: string): Promise<void> {
    const result = await this.eventModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
  async sendNotificationEmail(email: string, name: string, message:string) {
    console.log(nodemailer);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'motionmusicevent@gmail.com',
        pass: 'zegh acif smih ojir',
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: process.env.EMAIL_SUBJECT || 'Notification from Events',
      text: `Notification for event Booking,
  
      Name: ${name}
      Email: ${email}
      Detail:${message}
  
      Thank you,
      The Motion Music Team`,
    };
  
    await transporter.sendMail(mailOptions);
  }
  
}
