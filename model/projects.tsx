export interface ProjectApartment {
  projectApartmentID: string; // UUID, unique identifier for the project apartment
  projectApartmentName: string; // Name of the project apartment
  projectApartmentDescription: string; // Description of the project apartment
  price_range: string; // Price range (could be represented as a formatted string, e.g., "$500,000 - $1,000,000")
  createDate: string; // Creation date in ISO format (e.g., "2024-10-20T16:52:49.0770796+07:00")
  updateDate: string; // Last update date in ISO format
  projectApartmentStatus: number; // Status represented as an integer (e.g., 0: inactive, 1: active)
  apartmentProjectProviderID: string; // UUID of the provider responsible for the project apartment
  apartmentProjectProviderName: string | null; // Name of the provider, which may be null if not available
}
