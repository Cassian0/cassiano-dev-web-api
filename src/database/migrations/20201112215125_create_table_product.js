
exports.up = function(knex) {
  return knex.schema.createTable('product', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.decimal('price').notNullable();
    table.integer('category_id').notNullable();
    table.foreign('category_id').references('id').inTable('category');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product');
};
