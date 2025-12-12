import type {
  Customer,
  Fees,
  PaymentCard,
  PaymentPlan,
  PaymentState,
} from "./common";

interface Order {
  id: string;
  created: number;
  merchant_reference: string;
}

export interface Payment {
  id: string;
  created: number;
  state: PaymentState;
  origin: string;
  integration_origin: string | null;
  locale: string;
  country_of_service: string;
  payment_plan: PaymentPlan[];
  purchase_amount: number;
  fees: Fees;
  customer_interest: number;
  amount_left_to_pay: number;
  annual_interest_rate: number | null;
  deferred_days: number;
  deferred_months: number;
  deferred_trigger: boolean;
  deferred_trigger_applied: boolean | null;
  deferred_trigger_description: string | null;
  is_deferred_capture: boolean;
  merchant_id: string;
  merchant_brand: string;
  merchant_display_name: string;
  merchant_name: string;
  merchant_website: string | null;
  merchant_email: string[];
  merchant_phone: string | null;
  customer: Customer<PaymentCard>;
  recovery: unknown | null;
  refunds: unknown[];
  requirements: unknown[];
  preferred_payment_method: string;
  payment_method_providers: Record<string, string>;
  orders: Order[];
  return_url: string;
  logo_url: string | null;
  checkout_ab_tests: unknown[];
}

export interface Payments {
  total_amount_left_to_pay: number;
  payments: Payment[];
}
