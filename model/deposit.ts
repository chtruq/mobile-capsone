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
  depositCode: string;
  oldDepositCode: string | null;
  apartmentCode: string;
  depositPercentage: number;
  depositAmount: number;
  paymentAmount: number;
  brokerageFee: number;
  commissionFee: number;
  securityDeposit: number;
  tradeFee: number | null;
  note: string;
  description: string;
  createDate: string;
  updateDate: string;
  expiryDate: string;
  depositStatus: DepositStatus;
  depositType: DepositType;
  disbursementStatus: DisbursementStatus;
  accountID: string;
  apartmentID: string;
  teamMemberID: string | null;
  depositProfile: DepositProfile[];
}

export enum DepositStatus {
  Pending = "Pending",
  Accept = "Accept",
  Reject = "Reject",
  Disable = "Disable",
  PaymentFailed = "PaymentFailed",
  Paid = "Paid",
  TradeRequested = "TradeRequested",
  Exported = "Exported",
}

export enum DisbursementStatus {
  Pendingdisbursement = "Pendingdisbursement",
  ProcessingDisbursement = "ProcessingDisbursement",
  DisbursementCompleted = "DisbursementCompleted",
  DisbursementFailed = "DisbursementFailed",
}

export enum DepositType {
  Deposit = "Deposit",
  Trade = "Trade",
}
