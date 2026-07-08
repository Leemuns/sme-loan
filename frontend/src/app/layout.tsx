import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Container
            sx={{
              minHeight: "98vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header />
            {children}
            <Footer />
          </Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
