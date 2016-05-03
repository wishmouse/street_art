exports.up = function(knex, Promise) {
  console.log('artDetails table created')

  return knex.schema.createTableIfNotExists('artDetails', function(table) {
    table.increments('id')
    table.string('notes')
    table.integer('lat')
    table.integer('long')
    table.timestamp('date')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('artDetails').then(function () {
    console.log('artDetails table was dropped')
  })
};
