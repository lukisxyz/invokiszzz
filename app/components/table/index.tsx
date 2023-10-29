import { Link } from "@remix-run/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Person = {
  firstName: string;
  lastName: string;
  id: string | number;
};

const defaultData: Person[] = [
  {
    id: 1,
    firstName: "tanner",
    lastName: "linsley",
  },
  {
    id: 2,
    firstName: "tandy",
    lastName: "miller",
  },
  {
    id: 3,
    firstName: "joe",
    lastName: "dirte",
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.id, {
    id: "id",
    cell: (info) => (
      <i>
        <Link
          className="text-sm font-semibold text-blue-600 hover:underline"
          to={`/dashboard/invoice/${info.row.id}`}
        >
          Detail
        </Link>
      </i>
    ),
    header: () => <span></span>,
  }),
];

export default function Table({ title = "Title" }: { title: string }) {
  const data = defaultData;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden">
            <h1 className="p-3 mb-3 text-slate-600 text-base font-semibold">
              {title}
            </h1>
            <table className="min-w-full divide-y border-t divide-slate-200">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="px-3 py-4 whitespace-nowrap text-base font-medium text-slate-800"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
