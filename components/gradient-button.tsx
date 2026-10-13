import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand font-semibold text-white shadow-[0_10px_40px_-12px_var(--color-pink)] transition-[transform,filter,box-shadow] duration-200 ease-out hover:brightness-110 hover:shadow-[0_14px_50px_-10px_var(--color-pink)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none [&_svg]:size-[1.1em] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5";

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

type Common = { size?: keyof typeof sizes; className?: string; children: React.ReactNode };
type AsLink = Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<React.ComponentProps<"button">, "className" | "children">;

export function GradientButton(props: AsLink | AsButton) {
  const { size = "md", className, children, ...rest } = props;
  const cls = cn(base, sizes[size], className);
  if (rest.href !== undefined) {
    return (
      <Link {...(rest as Omit<AsLink, keyof Common>)} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" {...(rest as Omit<AsButton, keyof Common>)} className={cls}>
      {children}
    </button>
  );
}
