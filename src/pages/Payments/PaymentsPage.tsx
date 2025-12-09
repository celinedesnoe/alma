import { useEffect } from "react";

import { fetchPayments } from "@/services/payments";

const PaymentsPage = () => {
  useEffect(() => {
    fetchPayments();
  }, []);

  return <div>This is Payments page</div>;
};

export default PaymentsPage;
