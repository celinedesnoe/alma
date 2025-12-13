import { Tab } from "@/types/tabs";

interface PaymentPlanTabsProps {
  setVisibleTab: (tab: Tab) => void;
}

const PaymentPlanTabs = ({ setVisibleTab }: PaymentPlanTabsProps) => {
  const tabClassName =
    "cursor-pointer rounded-t-base inline-block border-b border-transparent p-4 hover:border-orange-600 hover:bg-orange-100 hover:text-orange-400";

  const onClickTab = (e: React.MouseEvent<HTMLButtonElement>, tab: Tab) => {
    e.preventDefault();
    setVisibleTab(tab);
  };

  return (
    <div
      data-testid="payment-plan-tabs"
      className="text-body border-default border-b text-center text-sm font-medium"
    >
      <ul className="-mb-px flex flex-wrap">
        <li>
          <button
            className={tabClassName}
            onClick={(e) => onClickTab(e, Tab.IN_PROGRESS)}
          >
            In Progress
          </button>
        </li>
        <li>
          <button
            className={tabClassName}
            onClick={(e) => onClickTab(e, Tab.HISTORY)}
          >
            History
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PaymentPlanTabs;
