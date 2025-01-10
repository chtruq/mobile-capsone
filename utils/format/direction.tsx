export const formatDirection = (direction: string) => {
  switch (direction) {
    case "Dong":
      return "Đông";
    case "Dong Bac":
      return "Đông Bắc";
    case "Bac":
      return "Bắc";
    case "Tay Bac":
      return "Tây Bắc";
    case "Tay":
      return "Tây";
    case "Tay Nam":
      return "Tây Nam";
    case "Nam":
      return "Nam";
    case "Dong Nam":
      return "Đông Nam";
    default:
      return "Không xác định";
  }
};
