"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable("devices", (table) => {
        table.boolean("is_test_device").notNullable().defaultTo(false);
    });
    // Create partial unique index - only one record can have is_test_device = true
    await knex.raw("CREATE UNIQUE INDEX unique_test_device ON devices (is_test_device) WHERE is_test_device = true");
}
async function down(knex) {
    await knex.raw("DROP INDEX IF EXISTS unique_test_device");
    await knex.schema.alterTable("devices", (table) => {
        table.dropColumn("is_test_device");
    });
}
