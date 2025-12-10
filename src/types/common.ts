export enum PaymentState {
  COMPLETED = "completed",
  LATE = "late",
  PENDING = "pending",
}

export enum InstallmentState {
  LATE = "late",
  PAID = "paid",
  PENDING = "pending",
}

export interface PaymentPlan {
  id: string;
  purchase_amount: number;
  due_date: number;
  original_due_date: number | null;
  date_paid: number | null;
  state: InstallmentState;
  customer_fee: number;
  customer_interest: number;
  customer_can_postpone_until: string | null;
  customer_cannot_postpone_reason: string | null;
  used_payment_method: string | null;
}

export interface Customer<T> {
  id: string;
  card: T;
  cards: T[];
  payment_methods: unknown[];
}

export interface Fees {
  customer: {
    total: number;
    total_excluding_tax: number;
    tax: number;
  };
}

export interface StripeSCARepresentation {
  customer_id: string;
  payment_method_id: string;
}
