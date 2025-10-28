import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("submissions", (table) => {
    table.increments("id").primary()
    table.integer("source_id").notNullable()
    table.integer("archive_item_id").nullable()

    table.string("referrer_ip_address").notNullable()
    table.string("status", 50).notNullable().defaultTo("pending")
    table.text("error_message").nullable()

    table.json("input_data").notNullable()
    table.json("processed_data").nullable()
    table.json("output_data").nullable()

    table.specificType("processed_at", "DATETIME2(0)")
    table
      .specificType("created_at", "DATETIME2(0)")
      .notNullable()
      .defaultTo(knex.raw("GETUTCDATE()"))
    table
      .specificType("updated_at", "DATETIME2(0)")
      .notNullable()
      .defaultTo(knex.raw("GETUTCDATE()"))
    table.specificType("deleted_at", "DATETIME2(0)")

    table.foreign("source_id").references("sources.id")
    table.foreign("archive_item_id").references("archive_items.id").onDelete("SET NULL")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("submissions")
}
