export interface DepositRequest {
  note: string;
  AccountID: string;
  ApartmentID: string;
  DepositProfile: {
    FullName: string;
    IdentityCardNumber: string;
    DateOfIssue: string; // Should be a date format
    DateOfBirth: string; // Should be a date format
    Nationality: string;
    Address: string;
    Email: string;
    PhoneNumber: string;
    IdentityCardFrontImage: File; // Expecting a file upload (binary)
    IdentityCardBackImage: File; // Expecting a file upload (binary)
  };
}

export interface ScannedInfo {
  accountId: string;
  apartmentId: string;
  email: string;
  phone: string;
  scannedAddress: string;
  scannedBirthDate: string;
  scannedGender: string;
  scannedIdNumber: string;
  scannedIssueDate: string;
  scannedName: string;
  selectedBackImage: string;
  selectedFrontImage: string;
}
