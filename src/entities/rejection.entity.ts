import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Отклонённое событие: кто, что и почему не принято
@Entity('rejections')
export class Rejection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'employee_name', length: 100 })
  employeeName!: string;

  @Column({ name: 'type_label', length: 50 })
  typeLabel!: string;

  @Column({ name: 'crm_id', length: 50 })
  crmId!: string;

  @Column({ type: 'text' })
  reason!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}