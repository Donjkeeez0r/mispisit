import { Controller, Get, Render } from '@nestjs/common';
import { GameService } from '../services/game.service';

@Controller()
export class HomeController {

  constructor(private readonly game: GameService) {}

  @Get()
  @Render('index')
  async home() {
    return { title: 'Главная', nav: 'home', summary: await this.game.getSummary() };
  }
}