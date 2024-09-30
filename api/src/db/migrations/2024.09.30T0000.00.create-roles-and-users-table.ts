import * as knex from "knex"

exports.up = async function (knex: knex.Knex, Promise: any) {
  await knex.schema.createTable("users", function (table) {
    table.increments("id").notNullable().primary()
    table.string("email", 100).notNullable()
    table.string("auth_subject", 100).notNullable()
    table.string("first_name", 100)
    table.string("last_name", 100)
    table.string("display_name", 200)
    table.string("title", 100)
    table.string("department", 100)
    table.string("division", 100)
    table.string("branch", 100)
    table.string("unit", 100)
    table.boolean("is_active").defaultTo(true).notNullable()
    table
      .specificType("created_at", "DATETIME2(0)")
      .notNullable()
      .defaultTo(knex.raw("GETUTCDATE()"))
    table
      .specificType("updated_at", "DATETIME2(0)")
      .notNullable()
      .defaultTo(knex.raw("GETUTCDATE()"))
    table.specificType("deleted_at", "DATETIME2(0)")
    table.unique(["email"], {
      indexName: "unique_users_email",
      predicate: knex.whereNull("deleted_at"),
    })
    table.unique(["authSubject"], {
      indexName: "unique_users_auth_subject",
      predicate: knex.whereNull("deleted_at"),
    })
  })

  await knex.schema.createTable("roles", function (table) {
    table.increments("id").notNullable().primary()
    table.integer("user_id").notNullable().references("users.id")
    table.string("role", 100).notNullable()
    table
      .specificType("created_at", "DATETIME2(0)")
      .notNullable()
      .defaultTo(knex.raw("GETUTCDATE()"))
    table
      .specificType("updated_at", "DATETIME2(0)")
      .notNullable()
      .defaultTo(knex.raw("GETUTCDATE()"))
    table.specificType("deleted_at", "DATETIME2(0)")
    table.unique(["user_id", "role"], {
      indexName: "unique_roles_user_id_role",
      predicate: knex.whereNull("deleted_at"),
    })
  })
}

exports.down = async function (knex: knex.Knex, Promise: any) {
  await knex.schema.dropTable("roles")
  await knex.schema.dropTable("users")
}
