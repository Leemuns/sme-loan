import { Toolbar, Typography, Box } from "@mui/material";
// import MenuButton from "@/components/MenuButton";

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: "white",
        borderBottom: "2px solid #e0e0e0",
        mb: 2,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            color: "inherit",
            flexGrow: 1,
          }}
        >
          SMELoan
        </Typography>

        {/* <MenuButton /> */}
      </Toolbar>
    </Box>
  );
}
