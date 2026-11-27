import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddXpEventComment1760000000001 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE xp_events
      ADD COLUMN comment VARCHAR(255) NOT NULL DEFAULT 'Без комментария'
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE xp_events
      DROP COLUMN comment
    `);
  }
}