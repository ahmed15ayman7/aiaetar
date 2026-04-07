"use client";

import { BodyFont } from "@/components/body-font";
import { DocumentLang } from "@/components/document-lang";
import { IntlProvider } from "@/lib/intl-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IntlProvider>
      <DocumentLang />
      <BodyFont>{children}</BodyFont>
    </IntlProvider>
  );
}
