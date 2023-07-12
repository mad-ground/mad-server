import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1689153968303 implements MigrationInterface {
    name = 'UpdatePostTable1689153968303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_9bc7387fd180347cbc5599270f3\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NULL DEFAULT 'player name'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`stateMessage\` varchar(255) NULL DEFAULT 'message..'`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_9bc7387fd180347cbc5599270f3\` FOREIGN KEY (\`hostId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_9bc7387fd180347cbc5599270f3\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`stateMessage\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_9bc7387fd180347cbc5599270f3\` FOREIGN KEY (\`hostId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
