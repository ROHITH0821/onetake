import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-price">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">We couldn&apos;t find that article</h1>
      <p className="mt-3 text-mist">It may have moved or never existed. Try the latest articles instead.</p>
      <Link href="/blog" className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-6 font-semibold text-white">
        Browse the blog
      </Link>
    </div>
  );
}
