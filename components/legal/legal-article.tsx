import { ArticleBody } from "@/components/blog/article-body";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { RichText } from "@/components/blog/rich-text";
import { JsonLd } from "@/components/json-ld";
import { formatDate } from "@/lib/blog";
import { LEGAL_UPDATED, type LegalPage } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

export const legalMetadata = (page: LegalPage) =>
  pageMetadata({ title: page.metaTitle, description: page.description, path: page.path });

/** A privacy, terms or contact page: breadcrumbs, title, last-updated date and body. */
export function LegalArticle({ page }: { page: LegalPage }) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: page.title, path: page.path },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <header className="mt-6 border-b border-white/10 pb-8">
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">{page.title}</h1>
        <p className="mt-4 text-sm text-mist">
          Last updated <time dateTime={LEGAL_UPDATED}>{formatDate(LEGAL_UPDATED)}</time>
        </p>
        <p className="mt-6 text-lg text-foreground/85 sm:text-xl">
          <RichText text={page.intro} />
        </p>
      </header>
      <div className="mt-6">
        <ArticleBody blocks={page.body} />
      </div>
    </article>
  );
}
