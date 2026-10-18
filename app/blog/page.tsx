import { BlogCard } from "@/components/blog/blog-card";
import { BlogCta } from "@/components/blog/blog-cta";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { BLOG, getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { blogSchema, breadcrumbSchema, type Crumb } from "@/lib/schema";
import { EarlyAccessLink } from "@/components/early-access/early-access";
import { CTA_LABEL } from "@/lib/pricing";

export const metadata = pageMetadata({ title: BLOG.metaTitle, description: BLOG.description, path: BLOG.path });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Blog", path: BLOG.path },
];

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl">
      <JsonLd
        data={[
          blogSchema({ path: BLOG.path, name: BLOG.title, description: BLOG.description, posts: posts.map((p) => ({ title: p.title, path: p.path, publishedAt: p.publishedAt })) }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <Breadcrumbs crumbs={crumbs} />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">{BLOG.title}</h1>
        <p className="mt-4 text-lg text-mist sm:text-xl">{BLOG.intro}</p>
        <EarlyAccessLink className="mt-6 inline-flex h-12 items-center rounded-full bg-brand px-6 font-semibold whitespace-nowrap text-white transition-transform hover:scale-[1.03]">
          {CTA_LABEL}
        </EarlyAccessLink>
      </header>

      <section aria-labelledby="latest-posts" className="mt-14">
        <h2 id="latest-posts" className="text-2xl font-semibold">
          Latest articles
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <BlogCard post={post} headingLevel="h3" priority={i === 0} />
            </li>
          ))}
        </ul>
      </section>

      <BlogCta
        className="mt-16"
        title="Got a clip in your gallery? Make it a reel."
        body="Upload a clip under a minute, tap your vibe and see the edit plan before you pay."
      />
    </div>
  );
}
