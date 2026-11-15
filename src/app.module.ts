import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './controllers/home.controller';
import { EmployeesController } from './controllers/employees.controller';
import { EventsController } from './controllers/events.controller';
import { GameService } from './services/game.service';
import { Employee } from './entities/employee.entity';
import { XpEvent } from './entities/xp-event.entity';
import { Rejection } from './entities/rejection.entity';
import { Notification } from './entities/notification.entity';
import { NotificationsController } from './controllers/notifications.controller';
import { UnreadMiddleware } from './unread.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Employee, XpEvent, Rejection, Notification],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    TypeOrmModule.forFeature([Employee, XpEvent, Rejection, Notification]),
  ],
  controllers: [HomeController, EmployeesController, EventsController, NotificationsController],
  providers: [GameService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UnreadMiddleware).forRoutes('*');
  }
}