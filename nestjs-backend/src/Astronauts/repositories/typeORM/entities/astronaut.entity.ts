import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Planet } from './planet.entity';

@Entity('astronauts')
export class TypeORMAstronaut {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Planet, (planet) => planet.astronauts, { nullable: false, eager: true })
  @JoinColumn({ name: 'originPlanetId' })
  originPlanet: Planet;
} 