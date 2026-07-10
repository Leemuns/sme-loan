import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
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
        </QueryProvider>
      </body>
    </html>
  );
}
