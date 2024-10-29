export interface ApartmentProjectProvider {
  apartmentProjectProviderID: string; // UUID, unique identifier for the provider
  apartmentProjectProviderName: string; // Name of the apartment provider
  apartmentProjectDescription: string; // Description of the apartment project provider
  legallInfor: string; // Legal information related to the provider or project
  location: string; // Location information (e.g., "City Center")
  diagramUrl: string; // URL of the diagram (e.g., blueprint or layout diagram)
  createDate: string; // Creation date in ISO format (e.g., "2024-10-17T16:46:58.6402659+07:00")
  updateDate: string; // Last update date in ISO format
  accountID: string; // UUID of the account associated with the provider
  accounts: any | null; // Additional account-related information, can be null
  projectApartments: any | null; // Details about related project apartments, can be null
  agreementUpdateRequests: any | null; // Information about agreement update requests, can be null
}
