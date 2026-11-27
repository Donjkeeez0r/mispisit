import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialLab5Schema1760000000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS xp_events (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        type VARCHAR(10) NOT NULL,
        crm_id VARCHAR(50) NOT NULL UNIQUE,
        xp INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS rejections (
        id SERIAL PRIMARY KEY,
        employee_name VARCHAR(100) NOT NULL,
        type_label VARCHAR(50) NOT NULL,
        crm_id VARCHAR(50) NOT NULL,
        reason TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        xp_event_id INTEGER NOT NULL REFERENCES xp_events(id) ON DELETE CASCADE,
        message TEXT NOT NULL,
        status VARCHAR(10) NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        read_at TIMESTAMPTZ
      )
    `);
  }

  async down(): Promise<void> {
    throw new Error(
      'Для отката к версии 0.0.5 восстановите базу из резервной копии.',
    );
  }
}