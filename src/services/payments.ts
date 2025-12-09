import type { PaymentDetail } from "@/types/payment";
import type { Payments } from "@/types/payments";

const API_URL: string = "http://localhost:3001";

export const fetchAPI = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
};

export const fetchPayments = (): Promise<Payments> =>
  fetchAPI<Payments>("/payments");

export const fetchPaymentDetails = (id: string): Promise<PaymentDetail> =>
  fetchAPI<PaymentDetail>(`/payment/payment_${id}`);
