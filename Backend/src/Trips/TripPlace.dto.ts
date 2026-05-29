import { IsNotEmpty, IsNumber, IsDateString } from "class-validator";

export class TripPlaceDto {

    @IsNotEmpty()
    @IsNumber()
    place_id!: number;

    @IsNotEmpty()
    @IsNumber()
    visit_order!: number;

    @IsNotEmpty()
    @IsDateString()
    planned_start!: Date;

    @IsNotEmpty()
    @IsNumber()
    estimated_cost!: number;
}