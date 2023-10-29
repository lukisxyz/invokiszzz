import type { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Link } from "@remix-run/react";

export default function SummaryCard({
  title,
  value,
  addition,
  link = null,
}: {
  title: ReactNode;
  value: number;
  addition?: ReactNode;
  link?: string | null;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="text-slate-600 text-base font-semibold">
        {title}
      </CardHeader>
      <CardContent>
        <span className="text-slate-700 text-xl font-medium">
          {value}
          <span className="text-base text-slate-500">{" invoices"}</span>
        </span>
        {addition}
      </CardContent>
      {link && (
        <CardFooter>
          <Link
            className="text-blue-500 mt-3 font-semibold text-sm hover:underline flex items-center gap-1"
            to={link}
          >
            Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M17 7l-10 10"></path>
              <path d="M8 7l9 0l0 9"></path>
            </svg>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
