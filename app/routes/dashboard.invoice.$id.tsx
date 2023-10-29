import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Navigation from "~/components/layout/navigation";
import Breadcrumb from "~/components/ui/breadcrumb";

export const meta: MetaFunction = () => {
  return [
    { title: "Inboice Dashboard" },
    { name: "description", content: "Easy Invoice Maker" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  return json({ id: params.id }, 200);
}

export default function Invoice() {
  const data = useLoaderData<typeof loader>();
  return (
    <main className="wrapper relative border-x page-container">
      <header>
        <Navigation />
      </header>
      <div className="my-7">
        <Breadcrumb />
        <div className="my-b mt-10">{`Data with ID: ${data.id}`}</div>
      </div>
    </main>
  );
}
