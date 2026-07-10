import { LoanStoreProvider } from "@/providers/LoanStoreProvider";

export default function LoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <LoanStoreProvider>{children}</LoanStoreProvider>
    </section>
  );
}
