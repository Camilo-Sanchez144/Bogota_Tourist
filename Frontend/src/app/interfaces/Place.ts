export interface Place {
    id: number;
    name: string;
    description: string;
    address?: string;
    neighborhood?: string;
    latitude: number;
    longitude: number;
    category: string;
    average_visit_duration?: number;
    price_range: string;
    opening_hours: any;
    main_image?: string;
    average_rating: number;
    total_reviews: number;
    status: string;
}
