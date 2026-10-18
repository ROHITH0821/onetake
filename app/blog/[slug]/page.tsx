import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/article-body";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCta } from "@/components/blog/blog-cta";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { RichText } from "@/components/blog/rich-text";
import { JsonLd } from "@/components/json-ld";
import { BLOG, formatDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbSchema, faqSchema, type Crumb } from "@/lib/schema";
import { PRICING_HREF } from "@/lib/site";

const COVER = { width: 1600, height: 900 };

type Props = { params: Promise<{ slug: string }> };

// Render each article completely before responding, so an unknown slug
// returns a real 404 status instead of a 200 with a not-found message.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  return pageMetadata({
    title: post.seoTitle ?? `${post.title} | OneTake Blog`,
    description: post.description,
    path: post.path,
    type: "article",
    // JPEG copy of the cover for link previews (some apps don't show WebP).
    image: { url: post.coverImage.replace(/^\/blog\/(.+)\.webp$/, "/blog/og/$1.jpg"), width: 1200, height: 675, alt: post.coverImageAlt },
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author],
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: BLOG.path },
    { name: post.title, path: post.path },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={[
          blogPostingSchema({
            path: post.path,
            title: post.title,
            description: post.description,
            image: post.coverImage,
            author: post.author,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            keywords: post.keywords,
          }),
          breadcrumbSchema(crumbs),
          // The FAQ below is rendered on the page, so this mirrors visible content.
          ...(post.faqs.length ? [faqSchema(post.faqs)] : []),
        ]}
      />

      <Breadcrumbs crumbs={crumbs} />

      <article className="mt-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-price">{post.category}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-mist">
            <span>By {post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.updatedAt && (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
          </p>
        </header>

        {/* Answer-first summary. */}
        <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-xl leading-relaxed text-foreground sm:p-6">
          <RichText text={post.answer} />
        </p>

        <figure className="mt-10">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            width={COVER.width}
            height={COVER.height}
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="h-auto w-full rounded-3xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-mist">{post.coverCaption}</figcaption>
        </figure>

        <div className="mt-6">
          <ArticleBody blocks={post.body} />
        </div>

        {post.faqs.length > 0 && (
          <section aria-labelledby="faq-heading" className="mt-14">
            <h2 id="faq-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {post.faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-lg font-semibold">{f.q}</dt>
                  <dd className="mt-2 text-foreground/80">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <BlogCta
          className="mt-14"
          title={post.cta?.title ?? "Turn your clip into a reel"}
          body={post.cta?.body ?? "Upload a clip under a minute, tap your vibe, and see the edit plan before you pay."}
        />

        <footer className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm">
          <Link href="/" className="text-mist hover:text-foreground">
            ← OneTake home
          </Link>
          <Link href={BLOG.path} className="text-mist hover:text-foreground">
            All articles
          </Link>
          <Link href={PRICING_HREF} className="text-mist hover:text-foreground">
            Pricing
          </Link>
        </footer>
      </article>

      {related.length > 0 && (
        <aside aria-labelledby="related-heading" className="mt-16">
          <h2 id="related-heading" className="text-2xl font-semibold">
            Related articles
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
