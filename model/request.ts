interface AppointmentRequest {
  requestID: string;
  appointmentRequestCode: string;
  customerID: string;
  apartmentID: string;
  apartmentCode: string;
  requestType: string;
  preferredDate: string;
  preferredTime: string;
  assignedDate: string | null;
  status: string;
  assignedTeamMemberID: string | null;
  sellerId: string | null;
  createDate: string;
  updateDate: string;
  username: string;
  phoneNumber: string;
  note: string | null;
}

interface PropertyRequest {
  requestID: string;
  propertyRequestCode: string;
  ownerID: string;
  propertyName: string;
  description: string;
  expectedPrice: number;
  address: string;
  requestDate: string;
  updateDate: string;
  requestStatus: string;
  userName: string;
  email: string;
  phoneNumber: string;
  assignedTeamMemberID: string | null;
  sellerId: string | null;
  note: string | null;
}
