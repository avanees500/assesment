import { QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'editor',
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'viewer',
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('roles', {
      name: ['admin', 'editor', 'viewer'],
    }, {});
  },
};
