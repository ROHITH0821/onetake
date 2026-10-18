import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog";

/** Post preview. The whole card is clickable via the title link's overlay. */
export function BlogCard({ post, headingLevel = "h2", priority = false }: { post: Post; headingLevel?: "h2" | "h3"; priority?: boolean }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2 transition-colors focus-within:border-pink hover:border-white/25">
      <div className="relative aspect-video overflow-hidden bg-ink-3">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-price">{post.category}</p>
        <Heading className="mt-2 text-xl font-semibold leading-snug">
          <Link href={post.path} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 text-sm text-mist">{post.excerpt}</p>
        <p className="mt-auto flex flex-wrap items-center gap-x-2 pt-5 text-xs text-mist">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime} min read</span>
        </p>
        <span className="mt-3 text-sm font-semibold text-foreground" aria-hidden>
          Read article <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </article>
  );
}
