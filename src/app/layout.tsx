import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";

export const metadata = {
  title: {
    template: "%s | Dev Outils",
    default: "Dev Outils",
  },
  description:
    "Discover the best curated tools and resources for developers and designers — including fonts, icon packs, color generators, and design inspiration. Stay productive with high-quality links tailored for building beautiful web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=quicksand@300,400,500,600,700,1&f[]=general-sans@200,201,300,301,400,401,500,501,600,601,700,701,1,2&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
