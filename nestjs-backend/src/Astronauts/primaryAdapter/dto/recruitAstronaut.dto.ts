import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PlanetDto } from './planet.dto';

export class RecruitAstronautDTO {
  @ApiProperty({
    example: 'John',
    description: 'First name of the astronaut'
  })
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the astronaut'
  })
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @ApiProperty({
    description: 'Planet the astronaut originates from',
    type: PlanetDto,
    example: { id: 'b7d21cf0-67d5-4db0-a1f7-eebd157fbb6f', name: 'Earth' }
  })
  @IsNotEmpty()
  readonly originPlanet: PlanetDto;
}


