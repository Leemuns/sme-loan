"use client";

import { useRouter } from "next/navigation";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import useUserLoanApplications from "@/hooks/useUserLoanApplications";
import { LoanApplicationMinimal } from "../types";

export default function UserDashboard() {
  const router = useRouter();
  const { loanApplications, status: loanStatus } = useUserLoanApplications();
  if (loanStatus === "pending") {
    return <p>Loading loan applications</p>;
  } else if (loanStatus === "error")
    throw new Error("Error getting loan applications");

  if (!loanApplications || loanApplications.length === 0) {
    return (
      <div>
        <p>
          You currently have no loan applications. Start applying to see them
          here!
        </p>
      </div>
    );
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Business Name</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Tenure Years</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loanApplications?.map((loan: LoanApplicationMinimal) => (
              <TableRow
                key={loan.id}
                hover
                onClick={() => {
                  router.push(`/loan/${loan.id}`);
                }}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {loan.id}
                </TableCell>
                <TableCell>{loan.businessName}</TableCell>
                <TableCell>{loan.loanAmount}</TableCell>
                <TableCell>{loan.loanTenureYears}</TableCell>
                <TableCell>{loan.loanPurpose}</TableCell>
                <TableCell>{loan.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="caption"
        sx={{
          mb: 1,
          color: "text.secondary",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <InfoOutlinedIcon fontSize="inherit" />
        Click on any row to view the full application details.
      </Typography>
    </div>
  );
}
