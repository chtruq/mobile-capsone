export interface ApartmentProjectProvider {
  apartmentProjectProviderID: string; // UUID of the provider
  apartmentProjectProviderName: string; // Name of the provider
  apartmentProjectDescription: string; // Description of the provider
  legallInfor: string; // Legal information
  location: string; // Location of the provider
  diagramUrl: string; // URL to the diagram
  createDate: string; // Creation date in ISO format
  updateDate: string; // Last update date in ISO format
  accountID: string; // UUID of the associated account
  accounts: any | null; // Associated accounts, type can be refined as needed
  projectApartments: any | null; // Associated project apartments, type can be refined as needed
}
