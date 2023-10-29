import SummaryCard from "~/components/common/summary-card";
import Table from "~/components/table";
import Breadcrumb from "~/components/ui/breadcrumb";

export default function HistoryPage() {
  return (
    <div className="my-7">
      <Breadcrumb />
      <br />
      <div>
        <SummaryCard title="Total Invoice Sent" key="all-invoice" value={56} />
        <div className="flex gap-3 my-3 w-full">
          <SummaryCard
            title={<span className="text-fuchsia-600">Pending Invoice</span>}
            key="pending-invoice"
            value={23}
          />
          <SummaryCard
            title={<span className="text-emerald-600">Paid Invoice</span>}
            key="paid-invoice"
            value={56}
          />
        </div>
      </div>
      <div>
        <Table title="Latest Invoices" />
      </div>
    </div>
  );
}
