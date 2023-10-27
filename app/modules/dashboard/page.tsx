import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="my-14">
      <div className="">
        <div className="mt-2 text-left">
          <h1 className="block font-bold text-slate-800 text-5xl">Inboice</h1>
        </div>
        <div className="mt-2 mb-8 text-left">
          <p className="text-lg text-gray-600">Simple Invoice Generator</p>
        </div>
        <Button size="lg" asChild>
          <Link to="/dashboard">Continue With Google</Link>
        </Button>
      </div>
    </div>
  );
}
