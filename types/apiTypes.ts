import { Models } from 'react-native-appwrite';

export type Facility =
  | 'Laundry'
  | 'Parking'
  | 'Sports-center'
  | 'Cutlery'
  | 'Gym'
  | 'Swimming-pool'
  | 'Wifi'
  | 'Pet-center';
export interface PropertiesCollection extends Models.Document {
  name: string;
  type: 'House' | 'Villa' | 'Townhouse' | 'Duplex' | 'Studio' | 'Apartment' | 'Condo' | 'Other';
  description: string;
  address: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: Facility[];
  image: string;
  geolocation: string;
  agent: string;
  gallery: string;
  reviews: string;
  is_favorite: boolean;
}

export interface AgentCollection extends Models.Document {
  name: string;
  email: string;
  avatar: string;
}
export interface ReviewsCollection extends Models.Document {
  name: string;
  avatar: string;
  review: string;
  rating: number;
  property: string;
}
