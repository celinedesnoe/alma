export enum State {
  IN_PROGRESS = "in_progress",
  PAID = "paid",
  PENDING = "pending",
}

// Generated with ChatGPT
export interface Payments {
  id: string;
  created: number;
  state: State;
  origin: string;
  integration_origin: string | null;
  locale: string;
  country_of_service: string;
  payment_plan: Installment[];
  purchase_amount: number;
  fees: {
    customer: {
      total: number;
      total_excluding_tax: number;
      tax: number;
    };
  };
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
  customer: Customer;
  recovery: unknown | null;
  refunds: unknown[];
  requirements: unknown[];
  preferred_payment_method: string;
  payment_method_providers: Record<string, string>;
  orders: Order[];
  return_url: string;
  logo_url: string;
  checkout_ab_tests: unknown[];
}

interface Installment {
  id: string;
  purchase_amount: number;
  due_date: number;
  original_due_date: number | null;
  date_paid: number | null;
  state: State;
  customer_fee: number;
  customer_interest: number;
  customer_can_postpone_until: string | null;
  customer_cannot_postpone_reason: string | null;
  used_payment_method: string | null;
}

interface Customer {
  id: string;
  card: Card;
  cards: Card[];
  payment_methods: unknown[];
}

interface Card {
  id: string;
  brand: string;
  iin: string;
  country: string;
  created: number;
  exp_month: number;
  exp_year: number;
  last4: string;
  verified: boolean;
  psp: string;
  psp_representations: {
    stripe_sca: {
      customer_id: string;
      payment_method_id: string;
    };
  };
}

interface Order {
  id: string;
  created: number;
  merchant_reference: string;
}
