import { serializeJsonLd, type JsonLdObject } from "@/lib/schema";

/** Renders one or more schema.org objects as a JSON-LD script tag. */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
