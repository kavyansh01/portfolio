import { Inter, Bebas_Neue, Schoolbell, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400"],
});

const schoolbell = Schoolbell({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
  weight: ["400"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Kavyansh | Full-Stack Web Developer — Building Modern Websites & Web Apps",
  description:
    "I'm Kavyansh, a full-stack web developer specializing in building fast, beautiful, and conversion-focused websites and web applications for businesses worldwide.",
  keywords: [
    "web developer",
    "full-stack developer",
    "freelance developer",
    "website design",
    "react developer",
    "next.js developer",
    "e-commerce developer",
  ],
  openGraph: {
    title: "Kavyansh | Full-Stack Web Developer",
    description:
      "Building fast, beautiful websites that help businesses grow.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} ${schoolbell.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
