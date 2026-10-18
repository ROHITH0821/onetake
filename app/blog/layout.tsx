import { EarlyAccessProvider } from "@/components/early-access/early-access";
import { Footer } from "@/components/landing/final-cta";
import { Navbar } from "@/components/landing/navbar";

/** Blog shell: same navbar and footer as the site; CTAs open the early-access form. */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <EarlyAccessProvider>
      <Navbar onHome={false} />
      <main id="main" className="flex-1 px-4 pb-16 pt-28 sm:px-6 sm:pt-36">
        {children}
      </main>
      <Footer onHome={false} />
    </EarlyAccessProvider>
  );
}
