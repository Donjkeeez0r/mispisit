import { Body, Controller, Get, Post, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { EventInput, GameService } from '../services/game.service';

@Controller('events')
export class EventsController {
  constructor(private readonly game: GameService) {}

  @Get('new')
  @Render('event-new')
  form(@Query('employeeId') employeeId?: string) {
    const employees = this.game.getEmployees().map((e) => ({
      ...e,
      selected: String(e.id) === employeeId,
    }));
    return { title: 'Начислить опыт', employees, types: this.game.getEventTypes() };
  }

  @Post()
  create(@Body() body: EventInput, @Res() res: Response) {
    const result = this.game.registerEvent(body);
    return res.redirect(result.ok ? `/employees/${result.employeeId}` : '/events/rejected');
  }

  @Get('rejected')
  @Render('rejected')
  rejected() {
    const rejections = this.game.getRejections();
    return { title: 'Отклонённые события', last: rejections[0], rest: rejections.slice(1) };
  }
}