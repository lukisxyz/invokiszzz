import type { MetaFunction } from "@remix-run/node";
import Navigation from "~/components/layout/navigation";
import HistoryPage from "~/modules/history/page";

export const meta: MetaFunction = () => {
  return [
    { title: "Inboice Dashboard" },
    { name: "description", content: "Easy Invoice Maker" },
  ];
};

export default function Index() {
  return (
    <main className="wrapper relative border-x page-container">
      <header>
        <Navigation />
      </header>
      <HistoryPage />
    </main>
  );
}
