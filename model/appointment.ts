interface Appointment {
  appointmentID: string;
  appointmentCode: string;
  apartmentCode: string;
  title: string;
  description: string;
  location: string;
  createDate: string;
  updatedDate: string;
  assignedDate: string;
  appointmentDate: Date;
  appointmentStatus: appointmentStatus;
  appointmentTypes: string;
  startTime: string;
  endTime: string;
  assignedTeamMemberID: string;
  assigndAccountID: string;
  sellerName: string;
  sellerPhone: string;
  customerID: string;
  customerName: string;
  customerPhone: string;
  apartmentID: string;
  referenceCode: string;
}

enum appointmentStatus {
  Confirmed = "Confirmed",
  InProcressing = "InProcressing",
  Done = "Done",
  Canceled = "Canceled",
  Updated = "Updated",
}
