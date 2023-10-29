import { Link, useMatches } from "@remix-run/react";
import type { BreadcrumbItem } from "~/lib/types";
import { capitalizeFirstLetter } from "~/lib/utils";

export default function Breadcrumb() {
  const matches = useMatches();
  const routes = matches[1].pathname.split("/").slice(1);
  const data: Array<BreadcrumbItem> = [];
  let count = 1;
  (routes || []).forEach((route) => {
    const path = routes.slice(0, count).join("/");
    data.push({
      isActive: count === routes.length,
      label: capitalizeFirstLetter(route),
      link: `/${path}`,
    });
    count++;
  });
  return (
    <ol
      className="flex items-center whitespace-nowrap min-w-0"
      aria-label="Breadcrumb"
    >
      {(data || []).map((i) =>
        i.isActive ? (
          <li
            key="active-page"
            className="text-sm font-semibold text-slate-800 truncate"
            aria-current="page"
          >
            {i.label}
          </li>
        ) : (
          <li
            key={i.link}
            className="text-sm text-slate-700 dark:text-slate-400"
          >
            <Link className="flex items-center hover:text-blue-700" to={i.link}>
              {i.label}
              <svg
                className="flex-shrink-0 h-5 w-5 text-slate-400 mx-1"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 13L10 3"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </li>
        )
      )}
    </ol>
  );
}
