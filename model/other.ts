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

