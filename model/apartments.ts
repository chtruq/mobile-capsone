interface ApartmentImage {
  apartmentImageID: string;
  imageUrl: string;
  description: string;
}

export interface Apartment {
  apartmentID: string;
  apartmentName: string;
  apartmentCode: string;
  description: string;
  address: string;
  area: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  location: string;
  direction: number;
  pricePerSquareMeter: number;
  price: number;
  effectiveStartDate: string;
  expiryDate: string;
  apartmentStatus: string;
  apartmentType: string;
  possessionType: string;
  balconyDirection: string;
  projectApartmentID: string;
  projectApartmentName: string;
  building: string;
  floor: number;
  roomNumber: number;
  images: ApartmentImage[];
  userLiked: boolean;
  vrVideoUrls: Array<string>;
  depositAmount: number;
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
  accountId?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface HistoryApartments {
  apartmentInteractionID: string;
  interactionDate: string;
  interactionTypes: string;
  accountID: string;
  apartmentID: string;
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
