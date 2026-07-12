import LoanApplicationDisplay from "@/components/LoanApplicationDisplay";

export default async function Loan({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <LoanApplicationDisplay loanId={id} />
    </div>
  );
}
