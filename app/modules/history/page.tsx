import SummaryCard from "~/components/common/summary-card";
import Table from "~/components/table";

export default function HistoryPage() {
  return (
    <div className="my-7">
      <div>
        <SummaryCard title="Total Invoice Sent" key="all-invoice" value={56} />
        <div className="flex gap-3 my-3 w-full">
          <SummaryCard
            title="Pending Invoice"
            key="pending-invoice"
            value={23}
          />
          <SummaryCard title="Paid Invoice" key="paid-invoice" value={56} />
        </div>
      </div>
      <div>
        <Table title="Latest Invoices" />
      </div>
    </div>
  );
}
