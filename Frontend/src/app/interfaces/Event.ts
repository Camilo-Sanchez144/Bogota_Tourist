export interface Event{
    id?:number;
    title:string;
    description:string;
    location:string;
    date: Date;
    max_people: number;
    current_people: number;
    price: number;
    created_at: Date;
}