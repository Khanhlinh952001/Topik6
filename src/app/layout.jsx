import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Thi Thu Topik",
  description: "Cùng nhau đạt topik 6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter}>{children}</body>
    </html>
  );
}
