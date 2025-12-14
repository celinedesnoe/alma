import { Tab } from "@/types/tabs";

interface PaymentPlanTabsProps {
  setVisibleTab: (tab: Tab) => void;
  visibleTab: Tab;
}

const PaymentPlanTabs = ({
  setVisibleTab,
  visibleTab,
}: PaymentPlanTabsProps) => {
  const tabClassName =
    "cursor-pointer rounded-t-base inline-block border-b border-transparent p-4 hover:border-orange-800 hover:bg-orange-300";

  const onClickTab = (e: React.MouseEvent<HTMLButtonElement>, tab: Tab) => {
    e.preventDefault();
    setVisibleTab(tab);
  };

  const isInProgressTabVisible: boolean = visibleTab === Tab.IN_PROGRESS;
  const isHistoryTabVisible: boolean = visibleTab === Tab.HISTORY;

  const visibleTabClassName: string = "border-orange-800 bg-orange-300";

  const inProgressTabClassName: string = isInProgressTabVisible
    ? visibleTabClassName
    : "";
  const HistoryTabClassName: string = isHistoryTabVisible
    ? visibleTabClassName
    : "";

  return (
    <div
      data-testid="payment-plan-tabs"
      className="text-body border-default border-b text-center text-sm font-medium"
    >
      <div className="-mb-px flex flex-wrap" role="tablist">
        <button
          className={`${tabClassName} ${inProgressTabClassName}`}
          onClick={(e) => onClickTab(e, Tab.IN_PROGRESS)}
          role="tab"
          aria-selected={isInProgressTabVisible}
          aria-controls={Tab.IN_PROGRESS}
        >
          In Progress
        </button>
        <button
          className={`${tabClassName} ${HistoryTabClassName}`}
          onClick={(e) => onClickTab(e, Tab.HISTORY)}
          role="tab"
          aria-selected={isHistoryTabVisible}
          aria-controls={Tab.HISTORY}
        >
          History
        </button>
      </div>
    </div>
  );
};

export default PaymentPlanTabs;
