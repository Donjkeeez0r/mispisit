import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventType } from '../data/game-rules';
import { Employee } from './employee.entity';

// Начисление опыта за событие из CRM
@Entity('xp_events')
export class XpEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee, (employee) => employee.events, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column({ type: 'varchar', length: 10 })
  type!: EventType;

  @Column({ name: 'crm_id', length: 50, unique: true })
  crmId!: string;

  @Column({ type: 'int' })
  xp!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}