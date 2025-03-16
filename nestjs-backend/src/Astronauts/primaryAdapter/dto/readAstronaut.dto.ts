import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { PlanetDto } from './planet.dto';

export class ReadAstronautDTO {
  @ApiProperty({
    example: 'b7d21cf0-67d5-4db0-a1f7-eebd157fbb6f',
    description: 'UUID of the planet'
  })
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
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
    type: PlanetDto,  // Assure-toi d'utiliser le type pour que Swagger le reconnaisse
    example: { id: 'b7d21cf0-67d5-4db0-a1f7-eebd157fbb6f', name: 'Earth' }
  })
  @IsNotEmpty()
  readonly originPlanet: PlanetDto;
}


