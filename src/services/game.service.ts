import { Injectable } from '@nestjs/common';
import {
  EMPLOYEES, EVENTS, EVENT_TYPES, REJECTIONS, XP_PER_LEVEL,
  Employee, EventType, Rejection, XpEvent,
} from '../data/demo-data';

export interface EventInput {
  employeeId?: string;
  type?: string;
  crmId?: string;
}

export type EventResult = { ok: true; employeeId: number } | { ok: false };

@Injectable()
export class GameService {
  private readonly employees: Employee[] = [...EMPLOYEES];
  private readonly events: XpEvent[] = [...EVENTS];
  private readonly rejections: Rejection[] = [...REJECTIONS];

  getEmployees() {
    return this.employees;
  }

  getEventTypes() {
    return Object.entries(EVENT_TYPES).map(([value, t]) => ({ value, label: t.label, xp: t.xp }));
  }

  getLeaderboard() {
    return this.employees
      .map((e) => ({ ...e, ...this.calcStats(e.id) }))
      .sort((a, b) => b.xp - a.xp)
      .map((row, i) => ({ ...row, place: i + 1 }));
  }

  getEmployeeCard(id: number) {
    const employee = this.employees.find((e) => e.id === id);
    if (!employee) return null;

    const history = this.events
      .filter((ev) => ev.employeeId === id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((ev) => ({
        date: formatDate(ev.createdAt),
        label: EVENT_TYPES[ev.type].label,
        crmId: ev.crmId,
        xp: EVENT_TYPES[ev.type].xp,
      }));

    return { ...employee, ...this.calcStats(id), history };
  }

  registerEvent(input: EventInput): EventResult {
    const employee = this.employees.find((e) => e.id === Number(input.employeeId));
    const type = input.type as EventType;
    const typeInfo = EVENT_TYPES[type];
    const crmId = (input.crmId ?? '').trim().toUpperCase();

    let reason: string | null = null;
    if (!employee) {
      reason = 'Не выбран сотрудник или такого сотрудника нет в системе.';
    } else if (!typeInfo) {
      reason = 'Неизвестный тип события. Допустимы: звонок, новый лид, закрытая сделка.';
    } else if (!crmId) {
      reason = 'Не указан ID события в CRM. Без него нельзя проверить, что событие не учтено повторно.';
    } else {
      const duplicate = this.events.find((ev) => ev.crmId === crmId);
      if (duplicate) {
        const owner = this.employees.find((e) => e.id === duplicate.employeeId)?.name ?? '—';
        reason = `Событие ${crmId} уже учтено ${formatDate(duplicate.createdAt)} (${owner}). Повторное начисление опыта запрещено.`;
      }
    }

    if (reason) {
      this.rejections.push({
        employeeName: employee?.name ?? 'не указан',
        typeLabel: typeInfo?.label ?? (input.type || 'не указан'),
        crmId: crmId || 'не указан',
        reason,
        createdAt: new Date(),
      });
      return { ok: false };
    }

    this.events.push({ employeeId: employee!.id, type, crmId, createdAt: new Date() });
    return { ok: true, employeeId: employee!.id };
  }

  getRejections() {
    return [...this.rejections]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((r) => ({ ...r, date: formatDate(r.createdAt) }));
  }

  private calcStats(employeeId: number) {
    const xp = this.events
      .filter((ev) => ev.employeeId === employeeId)
      .reduce((sum, ev) => sum + EVENT_TYPES[ev.type].xp, 0);
    const level = Math.floor(xp / XP_PER_LEVEL) + 1;
    const progress = xp % XP_PER_LEVEL;
    return { xp, level, progress, toNext: XP_PER_LEVEL - progress };
  }
}

function formatDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}