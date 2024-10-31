interface ApartmentImage {
  apartmentImageID: string;
  imageUrl: string;
  description: string;
}

export interface Apartment {
  apartmentID: string; // UUID, unique identifier for the apartment
  apartmentName: string; // Name of the apartment
  description: string; // Description of the apartment
  address: string; // Address of the apartment
  area: number; // Area in square meters
  numberOfRooms: number; // Number of rooms in the apartment
  numberOfBathrooms: number; // Number of bathrooms in the apartment
  location: string; // Location information, such as "Beachfront"
  direction: number; // Direction represented as an integer (e.g., 1 for North, 2 for East, etc.)
  pricePerSquareMeter: number; // Price per square meter
  price: number; // Total recommended price of the apartment
  expiryDate: string; // Expiry date in ISO format (e.g., "2027-10-17T16:46:58.6403193+07:00")
  apartmentStatus: string; // Status of the apartment (e.g., "Sold", "Available")
  apartmentType: string; // Type of the apartment (e.g., "Penthouse")
  balconyDirection: string; // Direction of the balcony (e.g., "TayNam")
  projectApartmentName: string; // Name of the apartment project
  verificationID: string; // Verification ID, can be a placeholder for unverified apartments
  images: ApartmentImage[]; // Array of URLs for images
}
export interface ApartmentSearchParams {
  apartmentName?: string;
  address?: string;
  district?: string;
  ward?: string;
  apartmentTypes?: number[];
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  numberOfRooms?: number;
  numberOfBathrooms?: number;
  directions?: number[];
  balconyDirections?: number[];
  saleStatuses?: number[];
  pageIndex?: number;
  pageSize?: number;
}

export const ApartmentTypes = [
  { label: "Căn Hộ Truyền Thống", value: 1 },
  { label: "Penthouse", value: 2 },
  { label: "Duplex", value: 3 },
  { label: "Shophouse", value: 4 },
  { label: "Studio", value: 5 },
  { label: "Officetel", value: 6 },
];

export const Directions = [
  { label: "Đông", value: 1 },
  { label: "Tây", value: 2 },
  { label: "Nam", value: 3 },
  { label: "Bắc", value: 4 },
  { label: "Đông Bắc", value: 5 },
  { label: "Đông Nam", value: 6 },
  { label: "Tây Bắc", value: 7 },
  { label: "Tây Nam", value: 8 },
];
