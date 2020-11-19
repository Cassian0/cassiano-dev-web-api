
// define a criação da migration
exports.up = function(knex) {
  return knex.schema.createTable('category', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
  });
};

// define regras de rollback
exports.down = function(knex) {
  return knex.schema.dropTable('category');
};
