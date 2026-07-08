import { LoanStoreProvider } from "@/providers/loanStoreProvider";

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
