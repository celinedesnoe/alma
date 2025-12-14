import { InstallmentState, type PaymentPlan } from "@/types/common";
import { useState } from "react";
import PaymentPlanTabs from "./PaymentPlanTabs/PaymentPlanTabs";
import PaymentPlanTabsContent from "./PaymentPlanTabsContent/PaymentPlanTabsContent";
import { Tab } from "@/types/tabs";

interface PaymentPlanProps {
  paymentPlan: PaymentPlan;
}

const PaymentPlanTable = ({ paymentPlan }: PaymentPlanProps) => {
  const [visibleTab, setVisibleTab] = useState<Tab>(Tab.IN_PROGRESS);

  const historyPaymentPlan = paymentPlan.filter(
    ({ state }) => state === InstallmentState.PAID,
  );

  const inProgressPaymentPlan = paymentPlan.filter(
    ({ state }) => state !== InstallmentState.PAID,
  );

  const tabContent =
    visibleTab === Tab.HISTORY ? historyPaymentPlan : inProgressPaymentPlan;

  return (
    <div
      data-testid="payment-plan"
      className="mb-4 rounded border border-gray-100 px-4 py-4 shadow-md"
    >
      <h2 className="mb-4 text-xl font-semibold">Your payment plan</h2>
      <PaymentPlanTabs setVisibleTab={setVisibleTab} visibleTab={visibleTab} />
      <PaymentPlanTabsContent
        paymentPlan={tabContent}
        visibleTab={visibleTab}
      />
    </div>
  );
};

export default PaymentPlanTable;
