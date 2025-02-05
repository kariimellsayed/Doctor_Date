import { Outfit } from "next/font/google";
import "./globals.scss";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { AuthProvider } from "./api/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Weights
});

export const metadata = {
  title: "Doctor Date", // Tab name
  description: "A platform for booking doctor appointments easily and quickly.", // Tap description
  icons: {
    icon: "/fav.svg", // Favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${outfit.variable}  antialiased`}>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
