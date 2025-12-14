import { formatCurrency } from "@/helpers/currency";
import { formatUnixDateToMMDDYYYY } from "@/helpers/date";
import { getInstallmentStyles } from "@/helpers/installment";
import { type PaymentPlan } from "@/types/common";
import type { Tab } from "@/types/tabs";

interface PaymentPlanTabsContentProps {
  paymentPlan: PaymentPlan;
  visibleTab: Tab;
}
const PaymentPlanTabsContent = ({
  paymentPlan,
  visibleTab,
}: PaymentPlanTabsContentProps) => {
  return (
    <div role="tabpanel" id={visibleTab} aria-labelledby={visibleTab}>
      {paymentPlan.length === 0 ? (
        <p data-testid="empty-payment-plan">No installments</p>
      ) : (
        <ul data-testid="payment-plan-tab-content" className="mt-4">
          {paymentPlan.map(({ id, due_date, purchase_amount, state }) => {
            const { bg, badgeClass, badgeLabel } = getInstallmentStyles(state);

            return (
              <li
                key={id}
                className={`mb-2 grid grid-cols-2 gap-2 rounded ${bg} px-4 py-2`}
                data-testid="installment"
              >
                <div className="flex-end col-span-1 flex">
                  <div className="w-25">
                    {formatUnixDateToMMDDYYYY(due_date)}
                  </div>
                  {badgeLabel ? (
                    <div data-testid="installment-state" className={badgeClass}>
                      {badgeLabel}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-1 text-right font-bold">
                  {formatCurrency(purchase_amount)}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PaymentPlanTabsContent;
