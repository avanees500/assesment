import { QueryInterface, Op } from 'sequelize';
import * as bcrypt from 'bcrypt';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const passwordHash = await bcrypt.hash('password123', 10);

    const [roles]: any[] = await queryInterface.sequelize.query(`
      SELECT id FROM roles WHERE name = 'admin';
    `);

    if (roles.length === 0) {
      throw new Error('Admin role not found. Please seed roles before users.');
    }

    const roleId: number = roles[0].id;

    const [users]: any[] = await queryInterface.sequelize.query(`
      SELECT id FROM users WHERE email = 'admin@example.com';
    `);

    let userId: number;

    if (users.length === 0) {
      const userInsert: any = await queryInterface.bulkInsert(
        'users',
        [
          {
            name: 'Admin User',
            email: 'admin@example.com',
            mobileNumber: '9999999999',
            password: passwordHash,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: true } as any,
      );

      userId = Array.isArray(userInsert)
        ? userInsert[0]?.id || userInsert[0]
        : userInsert;
    } else {
      userId = users[0].id;
    }

    await queryInterface.bulkInsert('user_roles', [
      {
        userId,
        roleId,
        createdBy: null,
        updatedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('user_roles', {
      userId: {
        [Op.in]: queryInterface.sequelize.literal(
          `(SELECT id FROM users WHERE email = 'admin@example.com')`,
        ),
      },
    });

    await queryInterface.bulkDelete('users', {
      email: 'admin@example.com',
    });
  },
};
