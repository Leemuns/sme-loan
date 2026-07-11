import { ReactNode } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface SummaryChunkProps {
  children: ReactNode;
  path: string;
}

export default function SummaryChunk({ children, path }: SummaryChunkProps) {
  const router = useRouter();
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        mb: 2,
      }}
    >
      {children}
      <Button
        variant="outlined"
        size="small"
        onClick={() => router.push(path)}
        sx={{ flexShrink: 0, mt: 2, color: "gray", borderColor: "gray" }}
      >
        Edit
      </Button>
    </Paper>
  );
}
