// src/events/events.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './event.service';


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() body: any) {
    return this.eventsService.create(body);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.eventsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
  @Post('send-notification') 
  async sendNotification(@Body('email') email: string, @Body('name') name: string, @Body('message') message :string) {
    try {
      await this.eventsService.sendNotificationEmail(email, name,message);
  
      return {
        success: true,
        message: 'Notification email sent successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send notification email',
        error: error.message,
      };
    }
  }
  
}
