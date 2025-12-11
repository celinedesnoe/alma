import type { PaymentDetails } from "@/types/payment";
import type { Payments } from "@/types/payments";

const API_URL: string = "http://localhost:3001";

export const fetchAPI = async <T>(endpoint: string): Promise<T> => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`,
      );
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
};

export const fetchPayments = (): Promise<Payments> =>
  fetchAPI<Payments>("/payments");

export const fetchPaymentDetails = (id: string): Promise<PaymentDetails> =>
  fetchAPI<PaymentDetails>(`/payment/${id}`);
