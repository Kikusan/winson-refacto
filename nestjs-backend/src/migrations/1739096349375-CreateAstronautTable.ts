import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAstronautTable1739096349375 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "astronauts" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "firstname" VARCHAR(255) NOT NULL,
                "lastname" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                "originPlanetId" uuid REFERENCES planets(id) NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "astronauts"`);
  }

}
