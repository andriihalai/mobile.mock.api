import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("devices", (table) => {
    table.boolean("is_test_device").notNullable().defaultTo(false);
  });

  // Create partial unique index - only one record can have is_test_device = true
  await knex.raw(
    "CREATE UNIQUE INDEX unique_test_device ON devices (is_test_device) WHERE is_test_device = true"
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw("DROP INDEX IF EXISTS unique_test_device");

  await knex.schema.alterTable("devices", (table) => {
    table.dropColumn("is_test_device");
  });
}
