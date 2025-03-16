import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanetModule } from './Planets/module';
import { AstronautModule } from './Astronauts/module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
      username: process.env.DATABASE_USER ?? 'postgres',
      password: process.env.DATABASE_PASSWORD ?? 'postgres',
      database: process.env.DATABASE_NAME ?? 'nestjs_db',
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun: true, // Exécution automatique des migrations au démarrage

    }),
    PlanetModule,
    AstronautModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }