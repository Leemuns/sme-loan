import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "../providers/QueryProvider";
import { LoanStoreProvider } from "../providers/LoanStoreProvider";

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
            <LoanStoreProvider>
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
            </LoanStoreProvider>
          </AppRouterCacheProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
