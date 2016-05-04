
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments('id')
    table.string('github_id')
    table.string('email')
    table.string('name')
  })  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
    .then(function () {
    })
};
