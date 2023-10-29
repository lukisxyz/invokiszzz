import LineChart from "~/components/chart/line-chart";
import SummaryCard from "~/components/common/summary-card";
import Table from "~/components/table";

export default function DashboardPage({ data }: { data: any }) {
  return (
    <div className="my-7">
      <div>
        <SummaryCard
          title="Total Invoice Sent"
          link="/dashboard/invoice"
          key="all-invoice"
          value={56}
        />
        <div className="flex gap-3 my-3 w-full">
          <SummaryCard
            title={<span className="text-fuchsia-600">Pending Invoice</span>}
            link="/dashboard/invoice?status=pending"
            key="pending-invoice"
            value={23}
          />
          <SummaryCard
            title={<span className="text-emerald-600">Paid Invoice</span>}
            link="/dashboard/invoice?status=paid"
            key="paid-invoice"
            value={56}
          />
        </div>
      </div>
      <div className="my-6">
        <LineChart data={data} />
      </div>
      <div>
        <Table title="Latest Invoices" />
      </div>
    </div>
  );
}
