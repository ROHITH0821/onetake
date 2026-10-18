import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/** Visible breadcrumb trail; pair it with breadcrumbSchema() using the same crumbs. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-mist">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="line-clamp-1 text-foreground/80">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="hover:text-foreground">
                    {c.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
