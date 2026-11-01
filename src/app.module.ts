import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './controllers/home.controller';
import { EmployeesController } from './controllers/employees.controller';
import { EventsController } from './controllers/events.controller';
import { GameService } from './services/game.service';
import { Employee } from './entities/employee.entity';
import { XpEvent } from './entities/xp-event.entity';
import { Rejection } from './entities/rejection.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Employee, XpEvent, Rejection],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    TypeOrmModule.forFeature([Employee, XpEvent, Rejection]),
  ],
  controllers: [HomeController, EmployeesController, EventsController],
  providers: [GameService],
})
export class AppModule {}