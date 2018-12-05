'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.create('contracts', (table) => {
      table.increments()
      table.string('client_name',50)
      table.string('client_address',50)
      table.string('client_phone',50)
      table.date('petition_date')
      table.integer('id_employ').unsigned()
      table.foreign('id_employ').references('employees.id')
      table.integer('id_service').unsigned()
      table.foreign('id_service').references('services.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractSchema
