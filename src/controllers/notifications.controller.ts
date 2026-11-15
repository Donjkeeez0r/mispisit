import { Controller, Get, Param, ParseIntPipe, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { GameService } from '../services/game.service';

// Уведомления о начислении опыта
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly game: GameService) {}

  @Get()
  @Render('notifications')
  async list() {
    const items = await this.game.getNotifications();
    return {
      title: 'Уведомления',
      nav: 'notifications',
      fresh: items.filter((n) => n.isNew),
      read: items.filter((n) => !n.isNew),
    };
  }

  @Post('read-all')
  async readAll(@Res() res: Response) {
    await this.game.markAllRead();
    return res.redirect('/notifications');
  }

  @Post(':id/read')
  async read(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.game.markRead(id);
    return res.redirect('/notifications');
  }
}