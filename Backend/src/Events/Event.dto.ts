import { IsString, IsNumber, IsDateString, Min, IsNotEmpty } from 'class-validator';

export class EventDto {

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @IsNumber()
  @Min(1)
  max_people!: number;

  @IsNumber()
  @Min(0)
  price!: number;
}