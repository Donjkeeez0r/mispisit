// Правила игры: сколько опыта даёт каждое событие из CRM и сколько нужно на уровень

export type EventType = 'call' | 'lead' | 'deal';

export const EVENT_TYPES: Record<EventType, { label: string; xp: number }> = {
  call: { label: 'Звонок клиенту', xp: 5 },
  lead: { label: 'Новый лид', xp: 10 },
  deal: { label: 'Закрытая сделка', xp: 50 },
};

export const XP_PER_LEVEL = 100;