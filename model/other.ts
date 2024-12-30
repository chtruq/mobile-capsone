export function formatCurrency(
  value: number | undefined,
  locale: string = "vi-VN"
): string {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (value >= 1_000_000_000 && value !== undefined) {
    return formatter.format(value / 1_000_000_000) + " tỷ";
  } else if (value >= 1_000_000 && value !== undefined) {
    return formatter.format(value / 1_000_000) + " triệu";
  } else if (value !== undefined) {
    return formatter.format(value) + " VND";
  }
}

export function formatArea(value: number | undefined): string {
  return value + " m²";
}

export const numberToWords = (num: number) => {
  const units = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const teens = [
    "mười",
    "mười một",
    "mười hai",
    "mười ba",
    "mười bốn",
    "mười lăm",
    "mười sáu",
    "mười bảy",
    "mười tám",
    "mười chín",
  ];
  const tens = [
    "",
    "",
    "hai mươi",
    "ba mươi",
    "bốn mươi",
    "năm mươi",
    "sáu mươi",
    "bảy mươi",
    "tám mươi",
    "chín mươi",
  ];
  const thousands = ["", "nghìn", "triệu", "tỷ"];

  if (num === 0) return "không";

  let words = "";

  const getChunk = (n) => {
    let chunk = "";
    if (n >= 100) {
      chunk += units[Math.floor(n / 100)] + " trăm ";
      n %= 100;
    }
    if (n >= 20) {
      chunk += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }
    if (n >= 10) {
      chunk += teens[n - 10] + " ";
    } else if (n > 0) {
      chunk += units[n] + " ";
    }
    return chunk.trim();
  };

  let i = 0;
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk > 0) {
      words = getChunk(chunk) + " " + thousands[i] + " " + words;
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return words.trim();
};
