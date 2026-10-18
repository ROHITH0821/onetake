import { LegalArticle, legalMetadata } from "@/components/legal/legal-article";
import { contact } from "@/lib/legal";

export const metadata = legalMetadata(contact);

export default function Page() {
  return <LegalArticle page={contact} />;
}
