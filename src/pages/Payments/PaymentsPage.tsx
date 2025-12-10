import { useEffect } from "react";

import { fetchPayments } from "@/services/payments";

const PaymentsPage = () => {
  useEffect(() => {
    fetchPayments();
  }, []);

  return <div data-testid="payments-page">This is Payments page</div>;
};

export default PaymentsPage;
