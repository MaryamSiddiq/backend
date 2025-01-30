import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/event.module';
import { EventsModulee } from './notification/events.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure this is at the top
    MongooseModule.forRoot('mongodb://localhost:27017/eventmang'), // Replace with your MongoDB connecti
    AuthModule,
    EventsModule
  ],
})
export class AppModule {}
