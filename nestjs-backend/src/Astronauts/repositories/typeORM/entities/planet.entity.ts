import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TypeORMAstronaut } from './astronaut.entity';

@Entity('planets')
export class Planet {
  @ApiProperty({ description: `Planet ID` })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Planet name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Planet habitable status' })
  @Column({ name: 'isHabitable' })
  isHabitable: boolean;

  @OneToMany(() => TypeORMAstronaut, (astronaut) => astronaut.originPlanet)
  astronauts: TypeORMAstronaut[];
} 