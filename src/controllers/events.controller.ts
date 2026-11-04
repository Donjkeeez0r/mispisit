import { Body, Controller, Get, Post, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { EventInput, GameService } from '../services/game.service';

// Изменение данных (начисление опыта) и страница отказов
@Controller('events')
export class EventsController {
  constructor(private readonly game: GameService) {}

  @Get('new')
  @Render('event-new')
  async form(@Query('employeeId') employeeId?: string) {
    const employees = await this.game.getEmployees();
    const selected = employees.find((e) => String(e.id) === employeeId);
    return {
      title: 'Начислить опыт',
      nav: 'new',
      employees,
      employeeName: selected?.name ?? '',
      types: this.game.getEventTypes(),
    };
  }

  @Post()
  async create(@Body() body: EventInput, @Res() res: Response) {
    const result = await this.game.registerEvent(body);
    return res.redirect(result.ok ? `/employees/${result.employeeId}` : '/events/rejected');
  }

  @Get('rejected')
  @Render('rejected')
  async rejected() {
    const rejections = await this.game.getRejections();
    return { title: 'Отклонённые события', nav: 'rejected', last: rejections[0], rest: rejections.slice(1) };
  }
}