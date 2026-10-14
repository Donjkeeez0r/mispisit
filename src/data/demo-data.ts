export type EventType = 'call' | 'lead' | 'deal';

export interface Employee {
  id: number;
  name: string;
}

export interface XpEvent {
  employeeId: number;
  type: EventType;
  crmId: string;
  createdAt: Date;
}

export interface Rejection {
  employeeName: string;
  typeLabel: string;
  crmId: string;
  reason: string;
  createdAt: Date;
}

// Опыт за событие
export const EVENT_TYPES: Record<EventType, { label: string; xp: number }> = {
  call: { label: 'Звонок клиенту', xp: 5 },
  lead: { label: 'Новый лид', xp: 10 },
  deal: { label: 'Закрытая сделка', xp: 50 },
};

export const XP_PER_LEVEL = 100;

export const EMPLOYEES: Employee[] = [
  { id: 1, name: 'Анна Смирнова' },
  { id: 2, name: 'Игорь Петров' },
  { id: 3, name: 'Мария Кузнецова' },
  { id: 4, name: 'Дмитрий Волков' },
];

export const EVENTS: XpEvent[] = [
  { employeeId: 1, type: 'deal', crmId: 'DEAL-1001', createdAt: new Date('2026-10-05T10:20:00') },
  { employeeId: 1, type: 'deal', crmId: 'DEAL-1004', createdAt: new Date('2026-10-07T15:05:00') },
  { employeeId: 1, type: 'lead', crmId: 'LEAD-3002', createdAt: new Date('2026-10-08T11:40:00') },
  { employeeId: 1, type: 'call', crmId: 'CALL-2003', createdAt: new Date('2026-10-09T09:30:00') },
  { employeeId: 2, type: 'deal', crmId: 'DEAL-1002', createdAt: new Date('2026-10-06T13:10:00') },
  { employeeId: 2, type: 'lead', crmId: 'LEAD-3001', createdAt: new Date('2026-10-06T16:45:00') },
  { employeeId: 2, type: 'call', crmId: 'CALL-2001', createdAt: new Date('2026-10-08T10:00:00') },
  { employeeId: 3, type: 'lead', crmId: 'LEAD-3003', createdAt: new Date('2026-10-07T12:15:00') },
  { employeeId: 3, type: 'lead', crmId: 'LEAD-3004', createdAt: new Date('2026-10-09T14:20:00') },
  { employeeId: 3, type: 'call', crmId: 'CALL-2002', createdAt: new Date('2026-10-09T17:50:00') },
  { employeeId: 4, type: 'call', crmId: 'CALL-2004', createdAt: new Date('2026-10-10T09:05:00') },
];

export const REJECTIONS: Rejection[] = [
  {
    employeeName: 'Игорь Петров',
    typeLabel: 'Закрытая сделка',
    crmId: 'DEAL-1001',
    reason: 'Событие DEAL-1001 уже учтено 05.10.2026 10:20 (Анна Смирнова). Повторное начисление опыта запрещено.',
    createdAt: new Date('2026-10-10T11:30:00'),
  },
];