import { json } from "@remix-run/node";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Navigation from "~/components/layout/navigation";
import DashboardPage from "~/modules/dashboard/page";

export const meta: MetaFunction = () => {
  return [
    { title: "Inboice Dashboard" },
    { name: "description", content: "Easy Invoice Maker" },
  ];
};

export const loader: LoaderFunction = () => {
  const data = [
    ["Week", "Cash"],
    ["Week 1", 56000000],
    ["Week 2", 49000000],
    ["Week 3", 69600000],
    ["Week 4", 78090000],
  ];

  return json({
    data,
  });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <main className="wrapper relative border-x page-container">
      <header>
        <Navigation />
      </header>
      <DashboardPage data={data} />
    </main>
  );
}
