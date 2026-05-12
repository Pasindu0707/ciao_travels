import { Fraunces, Cormorant_Garamond, Manrope } from "next/font/google";

export const fontDisplay = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

export const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const fontSans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700"],
});
