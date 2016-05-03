exports.up = function(knex, Promise) {
  console.log('artImage table created')

  return knex.schema.createTableIfNotExists('artImage', function(table) {
    table.increments('id')
    table.integer('detailsId')
    table.string('url')
    table.timestamp('date')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('artImage').then(function () {
    console.log('artImage table was dropped')
  })
};
