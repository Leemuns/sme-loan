"use client";

import { ReactNode, useRef, useState, type SyntheticEvent } from "react";
import { ZodSafeParseResult } from "zod";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, Paper } from "@mui/material";

interface FormWrapperProps {
  children: ReactNode;
  validator: () => ZodSafeParseResult<any>;
  backPath?: string;
  selfPath: string;
  nextPath: string;
  readOnly: boolean;
}

export default function FormWrapper({
  children,
  validator,
  backPath,
  nextPath,
  selfPath,
  readOnly,
}: FormWrapperProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBack = () => {
    if (!backPath) return;
    router.push(backPath);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const parseResult = validator();

    if (!parseResult.success) {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = null;
      }

      setErrorMessage(parseResult.error.issues[0].message);

      errorTimeoutRef.current = setTimeout(() => {
        setErrorMessage("");
        errorTimeoutRef.current = null;
      }, 3000);

      return;
    }

    router.push(nextPath);
  };

  if (readOnly) {
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
          onClick={() => router.push(selfPath)}
          sx={{ flexShrink: 0, mt: 2 }}
        >
          Edit
        </Button>
      </Paper>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}
      {children}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        {backPath ? (
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={handleBack}
          >
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </form>
  );
}
