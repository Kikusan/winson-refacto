import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlanetTable1703001234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "planets" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" VARCHAR(255) NOT NULL,
                "description" TEXT,
                "isHabitable" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "planets"`);
  }
}