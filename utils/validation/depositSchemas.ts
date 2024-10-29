import * as Yup from "yup";

export const declareInfoValidationSchema = Yup.object().shape({
  selectedFrontImage: Yup.string()
    .nullable()
    .required("Vui lòng chụp ảnh cccd mặt trước"),
  selectedBackImage: Yup.string()
    .nullable()
    .required("Vui lòng chụp ảnh căn cước mặt sau"),
  scannedIdNumber: Yup.string().required("Vui lòng nhập căn cước công dân"),
  scannedName: Yup.string().required("Vui lòng nhập họ và tên"),
  scannedBirthDate: Yup.date()
    .required("Vui lòng nhập ngày sinh")
    .typeError("Ngày sinh phải là định dạng DD/MM/YYYY"),
  scannedGender: Yup.string()
    .oneOf(["Nam", "Nữ", "Khác"], "Giới tính không xác định")
    .required("Vui lòng nhập giới tính"),
  scannedAddress: Yup.string().required("Vui lòng nhập địa chỉ"),
  scannedIssueDate: Yup.date()
    .required("Vui lòng nhập ngày cấp")
    .typeError("Ngày cấp phải là định dạng DD/MM/YYYY"),
  email: Yup.string()
    .email("Sai định dạng email")
    .required("Vui lòng nhập email"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Sai định dạng số điện thoại")
    .min(10, "Số điện thoại ít nhất là 10 số")
    .max(11, "Số điện thoại tối đa là 11 số")
    .required("Vui lòng nhập số điện thoại"),
});

export const depositSchemas = {
  DepositProfile: Yup.object().shape({
    FullName: Yup.string().required("Full Name is required"),
    IdentityCardNumber: Yup.string().required(
      "Identity Card Number is required"
    ),
    DateOfIssue: Yup.date()
      .required("Date of Issue is required")
      .typeError("Date of Issue must be a valid date"),
    DateOfBirth: Yup.date()
      .required("Date of Birth is required")
      .typeError("Date of Birth must be a valid date"),
    Nationality: Yup.string().required("Nationality is required"),
    Address: Yup.string().required("Address is required"),
    Email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    PhoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number cannot exceed 15 digits")
      .required("Phone number is required"),
    IdentityCardFrontImage: Yup.mixed()
      .required("Front Image of Identity Card is required")
      .test("fileFormat", "Unsupported Format", (value) => {
        if (value && typeof value === "object") {
          const file = value as { type: string };
          return ["image/jpeg", "image/png"].includes(file.type);
        }
        return false;
      }),
    IdentityCardBackImage: Yup.mixed()
      .required("Back Image of Identity Card is required")
      .test("fileFormat", "Unsupported Format", (value) => {
        if (value && typeof value === "object") {
          const file = value as { type: string };
          return ["image/jpeg", "image/png"].includes(file.type);
        }
        return false;
      }),
  }),
};
