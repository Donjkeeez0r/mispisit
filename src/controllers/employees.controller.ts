import { Controller, Get, NotFoundException, Param, ParseIntPipe, Render } from '@nestjs/common';
import { GameService } from '../services/game.service';

// Просмотр: рейтинг и карточка сотрудника
@Controller()
export class EmployeesController {
  constructor(private readonly game: GameService) {}

  @Get('leaderboard')
  @Render('leaderboard')
  async leaderboard() {
    return { title: 'Рейтинг', rows: await this.game.getLeaderboard() };
  }

  @Get('employees/:id')
  @Render('employee')
  async card(@Param('id', ParseIntPipe) id: number) {
    const employee = await this.game.getEmployeeCard(id);
    if (!employee) throw new NotFoundException('Сотрудник не найден');
    return { title: employee.name, employee };
  }
}