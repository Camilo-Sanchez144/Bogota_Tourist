import { IsNotEmpty, IsNumber, IsString, IsDateString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TripDayDto } from "./TripDay.dto";

export class TripDto {

    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsDateString()
    start_date!: Date;

    @IsNotEmpty()
    @IsDateString()
    end_date!: Date;

    @IsNotEmpty()
    @IsNumber()
    number_of_people!: number;

    @IsNotEmpty()
    @IsNumber()
    total_budget!: number;

    @ValidateNested({ each: true })
    @Type(() => TripDayDto)
    days!: TripDayDto[];
}