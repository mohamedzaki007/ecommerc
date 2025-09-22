import { Category } from "./category.model"; // This line is correct if you use the Category interface from that file

// 1. Interface for Subcategory (Renamed for clarity)
export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

// 2. Interface for the main Product object (Renamed to singular 'Product')
export interface Product {
    sold: number;
    images: string[];
    // Corrected the name to SubCategory to match the interface above
    subcategory: SubCategory[]; 
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    // The API returns the brand and category objects with the same structure
    category: Category; 
    brand: Category;
    ratingAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}

// 4. Interface for the API response structure
export interface ProductResponse {
    data: Product[] | Product | null;
    status?: number;
    message?: string;
}
