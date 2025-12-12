const NextInstallmentSection = ({ date }: { date: string | null }) => {
  if (!date) return;

  return (
    <div
      data-testid="next-installment"
      className="mb-4 rounded border border-gray-100 px-4 py-4 shadow-md"
    >
      <h2 className="mb-4 text-xl font-semibold">Your next installment</h2>
      <p>
        You will be withdrawn automatically on{" "}
        <span className="text-orange-600">{date}</span>
      </p>
    </div>
  );
};

export default NextInstallmentSection;
