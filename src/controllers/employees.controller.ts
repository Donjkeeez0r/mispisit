import { Controller, Get, NotFoundException, Param, ParseIntPipe, Render } from '@nestjs/common';
import { GameService } from '../services/game.service';

@Controller()
export class EmployeesController {
  constructor(private readonly game: GameService) {}

  @Get('leaderboard')
  @Render('leaderboard')
  leaderboard() {
    return { title: 'Рейтинг', rows: this.game.getLeaderboard() };
  }

  @Get('employees/:id')
  @Render('employee')
  card(@Param('id', ParseIntPipe) id: number) {
    const employee = this.game.getEmployeeCard(id);
    if (!employee) throw new NotFoundException('Сотрудник не найден');
    return { title: employee.name, employee };
  }
}