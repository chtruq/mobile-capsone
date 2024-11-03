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

export interface DepositProfile {
  fullName: string;
  identityCardNumber: string;
  dateOfIssue: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  email: string;
  phoneNumber: string;
  identityCardFrontImage: string;
  identityCardBackImage: string;
}

export interface Deposit {
  depositID: string;
  depositPercentage: number;
  depositAmount: number;
  note: string;
  description: string;
  createDate: string;
  updateDate: string;
  expiryDate: string;
  depositStatus: number;
  accountID: string;
  apartmentID: string;
  depositProfile: DepositProfile[];
}
