import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EVENT_TYPES, EventType, XP_PER_LEVEL } from '../data/game-rules';
import { Employee } from '../entities/employee.entity';
import { Rejection } from '../entities/rejection.entity';
import { XpEvent } from '../entities/xp-event.entity';

export interface EventInput {
  employeeName?: string;
  type?: string;
  crmId?: string;
}

export type EventResult = { ok: true; employeeId: number } | { ok: false };

// Игровая логика: подсчёт опыта и уровней, приём событий, журнал отказов.
@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Employee) private readonly employees: Repository<Employee>,
    @InjectRepository(XpEvent) private readonly events: Repository<XpEvent>,
    @InjectRepository(Rejection) private readonly rejections: Repository<Rejection>,
  ) {}

  getEmployees() {
    return this.employees.find({ order: { name: 'ASC' } });
  }

  getEventTypes() {
    return Object.entries(EVENT_TYPES).map(([value, t]) => ({ value, label: t.label, xp: t.xp }));
  }

  // Рейтинг: сотрудники по убыванию опыта
  async getLeaderboard() {
    const employees = await this.employees.find({ relations: { events: true } });
    return employees
      .map((e) => ({ id: e.id, name: e.name, ...calcStats(e.events) }))
      .sort((a, b) => b.xp - a.xp)
      .map((row, i) => ({ ...row, place: i + 1 }));
  }

  // Карточка сотрудника: уровень, прогресс и история начислений
  async getEmployeeCard(id: number) {
    const employee = await this.employees.findOne({ where: { id }, relations: { events: true } });
    if (!employee) return null;

    const history = [...employee.events]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((ev) => ({
        date: formatDate(ev.createdAt),
        label: EVENT_TYPES[ev.type]?.label ?? ev.type,
        crmId: ev.crmId,
        xp: ev.xp,
      }));

    return { id: employee.id, name: employee.name, ...calcStats(employee.events), history };
  }

  // Приём события из CRM: либо начисляем опыт, либо пишем отказ в журнал
  async registerEvent(input: EventInput): Promise<EventResult> {
    const name = (input.employeeName ?? '').trim();
    const type = input.type as EventType;
    const typeInfo = EVENT_TYPES[type];
    const crmId = (input.crmId ?? '').trim().toUpperCase();

    let reason: string | null = null;
    if (!name) {
      reason = 'Не указан сотрудник.';
    } else if (name.length > 100) {
      reason = 'Имя сотрудника длиннее 100 символов.';
    } else if (!typeInfo) {
      reason = 'Неизвестный тип события. Допустимы: звонок, новый лид, закрытая сделка.';
    } else if (!crmId) {
      reason = 'Не указан ID события в CRM. Без него нельзя проверить, что событие не учтено повторно.';
    } else if (crmId.length > 50) {
      reason = 'ID события в CRM длиннее 50 символов.';
    } else {
      const duplicate = await this.events.findOne({ where: { crmId }, relations: { employee: true } });
      if (duplicate) {
        reason = `Событие ${crmId} уже учтено ${formatDate(duplicate.createdAt)} (${duplicate.employee.name}). Повторное начисление опыта запрещено.`;
      }
    }

    if (reason) {
      await this.rejections.save(
        this.rejections.create({
          employeeName: (name || 'не указан').slice(0, 100),
          typeLabel: typeInfo?.label ?? (input.type || 'не указан').slice(0, 50),
          crmId: (crmId || 'не указан').slice(0, 50),
          reason,
        }),
      );
      return { ok: false };
    }

    // Сотрудник создаётся при первом событии, дальше находится по имени
    let employee = await this.employees.findOneBy({ name });
    if (!employee) {
      employee = await this.employees.save(this.employees.create({ name }));
    }

    await this.events.save(this.events.create({ employee, type, crmId, xp: typeInfo.xp }));
    return { ok: true, employeeId: employee.id };
  }

  // Журнал отказов
  async getRejections() {
    const rows = await this.rejections.find({ order: { createdAt: 'DESC' } });
    return rows.map((r) => ({ ...r, date: formatDate(r.createdAt) }));
  }
}

function calcStats(events: XpEvent[]) {
  const xp = events.reduce((sum, ev) => sum + ev.xp, 0);
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const progress = xp % XP_PER_LEVEL;
  return { xp, level, progress, toNext: XP_PER_LEVEL - progress };
}

function formatDate(d: Date): string {
  return d.toLocaleString('ru-RU', {
    timeZone: 'Europe/Ulyanovsk',
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}