import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getHome(): string {
    return `
      <h1>Геймификация отдела продаж</h1>
      <p>Система геймификации отдела продаж для Bitrix24</p>
      <p>Версия 0.0.1</p>
      <p>Разработка в процессе</p>
    `;
  }
}