import { IsOptional, IsNumber, IsDateString } from "class-validator";

export class TripPlaceUpdateDto {

    @IsOptional()
    @IsNumber()
    place_id?: number;

    @IsOptional()
    @IsNumber()
    visit_order?: number;

    @IsOptional()
    @IsDateString()
    planned_start?: Date;

    @IsOptional()
    @IsNumber()
    estimated_cost?: number;
}