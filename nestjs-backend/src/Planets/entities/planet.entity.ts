import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('planets')
export class Planets {
  @ApiProperty({ description: `Planet ID` })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Planet name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Planet description' })
  @Column()
  description: string;

  @ApiProperty({ description: 'Planet habitable status', default: true })
  @Column({ name: 'isHabitable', default: true })
  isHabitable: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt: Date;
} 