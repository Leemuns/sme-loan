"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Button } from "@mui/material";
import useLoanApplication from "@/hooks/useLoanApplication";

export default function LoanApplicationDisplay({ loanId }: { loanId: string }) {
  const printRef = useRef<HTMLDivElement>(null);
  const { loanApplication, status: loanStatus } = useLoanApplication(loanId);
  if (loanStatus === "pending") {
    return <p>Loading loan applications</p>;
  } else if (loanStatus === "error")
    throw new Error("Error getting loan application");

  // TODO: fix order of property names, bit messed up from backend
  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(loanApplication, null, 2);

    // tmp url for download then cleanup
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${loanApplication!.businessName} loan-application.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("document.pdf");
  };

  return (
    <Box>
      <Box ref={printRef}>
        {Object.values(loanApplication!).map((v: string) => (
          <p key={v}>{v}</p>
        ))}
      </Box>
      <Button variant="contained" onClick={handleDownloadPDF}>
        Download as PDF
      </Button>
      <Button variant="contained" onClick={handleDownloadJSON}>
        Download as JSON
      </Button>
    </Box>
  );
}
