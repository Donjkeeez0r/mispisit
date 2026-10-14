import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { EmployeesController } from './controllers/employees.controller';
import { EventsController } from './controllers/events.controller';
import { GameService } from './services/game.service';

@Module({
  controllers: [HomeController, EmployeesController, EventsController],
  providers: [GameService],
})
export class AppModule {}