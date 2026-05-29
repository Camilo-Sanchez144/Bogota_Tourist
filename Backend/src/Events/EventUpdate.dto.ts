import { IsString, IsNumber, IsDateString, Min, IsNotEmpty, IsOptional } from 'class-validator';

export class EventUpdateDto {

  @IsString()
  @IsOptional()
  title!: string;

  @IsNumber()
  @IsOptional()
  user!: number;

  @IsString()
  @IsOptional()
  description!: string;

  @IsString()
  @IsOptional()
  location!: string;

  @IsDateString()
  @IsOptional()
  date!: string;

  @IsNumber()
  @Min(1)
  max_people!: number;

  @IsNumber()
  @Min(0)
  price!: number;
}