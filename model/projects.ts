export interface ProjectApartment {
  projectApartmentID: string;
  projectApartmentName: string;
  projectCode: string;
  projectApartmentDescription: string;
  price_range: string;
  apartmentArea: string;
  projectArea: string;
  projectSize: string;
  constructionStartYear: string;
  constructionEndYear: string;
  address: string;
  addressUrl: string;
  totalApartment: string;
  createDate: string;
  updateDate: string;
  projectApartmentStatus: string;
  apartmentProjectProviderID: string;
  apartmentProjectProviderName: string | null;
  licensingAuthority: string;
  licensingDate: string;
  projectImages: {
    projectImageID: string;
    description: string;
    url: string;
  }[];
  facilities: {
    facilitiesID: string;
    facilitiesName: string;
    facilitiesDescription: string;
  }[];
  projectType: string;
  teamID: string;
  teamName: string;
  financialContracts: any[];
  projectFiles: any[];
  totalApartments: number;
  apartmentStatusCount: Record<string, any>;
}
