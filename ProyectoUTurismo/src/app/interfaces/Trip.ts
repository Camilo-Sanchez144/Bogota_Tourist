import { Place } from "./Place";

export interface TripPlace {
    id: number;
    place: Place;
    visit_order: number;
    estimated_cost: number;
    planned_start_time?: string;
    planned_end_time?: string;
    notes?: string;
}

export interface TripDay {
    id: number;
    date: string;
    day_number: number;
    places?: TripPlace[];
}

export interface Trip {
    id?: number;
    title: string;
    description?: string;
    travel_date: string;
    number_of_people: number;
    daily_budget?: number;
    plan_name?: string;
    plan_price?: number;
    user?: number;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}
