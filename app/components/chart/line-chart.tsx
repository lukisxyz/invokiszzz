import { Chart } from "react-google-charts";
import { Card, CardContent, CardHeader } from "../ui/card";

export const options = {
  vAxis: {
    format: "short",
  },
  chartArea: {
    width: "85%",
    height: "75%",
  },
  legend: { position: "top", curveType: "function" },
};

export default function LineChart({ data }: { data: any }) {
  if (!data || (data || []).length === 0) {
    return (
      <Card>
        <CardHeader className="text-slate-600 text-base font-semibold">
          Cash Flow
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <p className="text-slate-600 font-medium text-sm">Data is empty</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader className="text-slate-600 text-base font-semibold">
        Cash Flow
      </CardHeader>
      <CardContent>
        <Chart
          chartType="LineChart"
          options={options}
          width="100%"
          height="200px"
          data={data}
        />
      </CardContent>
    </Card>
  );
}
