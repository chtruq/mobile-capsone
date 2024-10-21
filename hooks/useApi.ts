import { useState } from "react";

type ApiFunction<T> = (...args: any[]) => Promise<T>;

export const useApi = <T>(apiFunction: ApiFunction<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const request = async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      setData(response);
      return response;
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      throw err; // Re-throw để có thể xử lý thêm tại nơi khác nếu cần
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    request,
  };
};
