import { LegalArticle, legalMetadata } from "@/components/legal/legal-article";
import { privacy } from "@/lib/legal";

export const metadata = legalMetadata(privacy);

export default function Page() {
  return <LegalArticle page={privacy} />;
}
