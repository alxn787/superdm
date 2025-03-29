'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SidebarDemo2 } from "@/components/side2";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current path

  const isHomePage = pathname === "/"; // Check if it's the root page

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {isHomePage ? ( 
            children 
          ) : (
            <SidebarDemo2>
              <Toaster 
                position="top-right" 
                reverseOrder={false} 
                toastOptions={{
                  style: {
                    background: "#333",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "5px",
                  },
                }}
              />
                {children}
            </SidebarDemo2>
          )}
        </Providers>
      </body>
    </html>
  );
}

