import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Umzug } from 'umzug';
import request from 'supertest';
import { migrator } from '../test-migrations/config-migrations/migrator';
import { ClientAdminModel } from '../modules';
import { clientRouter } from './clients';

describe('Integration test Client api', () => {
  const app: Express = express();
  app.use(express.json());
  app.use('/client', clientRouter);

  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ClientAdminModel]);
    migration = migrator(sequelize);
    await migration.up();
  });
  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
    await sequelize.close();
  });
  it('should create a Client admin', async () => {
    const output = await request(app).post('/client').send({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@test.com',
      document: '123456789',
      street: 'Street',
      number: '123',
      complement: 'Complement',
      city: 'City',
      state: 'State',
      zipCode: '12345678',
    });
    expect(output.status).toEqual(200);
  });
});
