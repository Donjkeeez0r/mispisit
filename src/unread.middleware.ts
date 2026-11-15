import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { GameService } from './services/game.service';

// Перед каждой страницей кладёт число непрочитанных уведомлений в res.locals,
@Injectable()
export class UnreadMiddleware implements NestMiddleware {
  constructor(private readonly game: GameService) {}

  async use(_req: Request, res: Response, next: NextFunction) {
    try {
      res.locals.unread = await this.game.countUnread();
    } catch {
      res.locals.unread = 0;
    }
    next();
  }
}