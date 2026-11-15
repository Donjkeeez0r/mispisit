import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { XpEvent } from './xp-event.entity';

export type NotificationStatus = 'new' | 'read';

// Уведомление сотруднику о начислении опыта
@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @ManyToOne(() => XpEvent, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'xp_event_id' })
  xpEvent!: XpEvent;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'varchar', length: 10, default: 'new' })
  status!: NotificationStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @Column({ name: 'read_at', type: 'timestamptz', nullable: true })
  readAt!: Date | null;
}