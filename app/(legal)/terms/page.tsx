import { LegalArticle, legalMetadata } from "@/components/legal/legal-article";
import { terms } from "@/lib/legal";

export const metadata = legalMetadata(terms);

export default function Page() {
  return <LegalArticle page={terms} />;
}
