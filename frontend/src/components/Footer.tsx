import { Box, Container, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "2px solid #e0e0e0",
        mt: "auto",
      }}
    >
      <Container
        sx={{
          py: 1,
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" component="div" sx={{ mr: 2 }}>
          2026 - Made by Tan Zi Yuen
        </Typography>

        <IconButton
          color="inherit"
          aria-label="GitHub"
          href="https://github.com/Leemuns/sme-loan"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
      </Container>
    </Box>
  );
}
