import { Arimo, Imperial_Script, Manrope } from "next/font/google";

const arimo = Arimo({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-title",
  display: "swap",
});

const imperialScript = Imperial_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

/* Manrope is a variable font: the 400–700 weights the design uses all come from one file. */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = [arimo.variable, imperialScript.variable, manrope.variable].join(" ");
