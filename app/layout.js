"use client";

import { Fill, ReExtProvider } from "@sencha/reext";
import { SidebarProvider } from "./context/GlobalContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const ReExtData = {
    sdkversion: "7.8.0", //7.8.0 | 7.9.0
    toolkit: "classic", //modern | classic
    theme: "triton", //triton | material | classic
    packages: {
      charts: true,
      fontawesome: true,
      ux: true,
      calendar: true,
      d3: false,
      exporter: true,
      pivot: false,
      pivotd3: false,
      pivotlocale: false,
      froalaeditor: false,
    },
    rtl: false,
    locale: "en",
    debug: false,
    urlbase: "./",
    location: "remote",
    overrides: false,

    // NEW
    customfolder: "custom", // name of the folder in public
    customfiles: [
      "MainList.jsx",
      "Store.jsx",
      "GridController.jsx",
      "NavController.jsx",
      "SumaList.jsx",
      "SumaMobileList.jsx",
      "ActiveAdminController.jsx",
      "RealtimeController.jsx",
      "RealtimeChart.jsx",
      "ActiveAdminList.jsx",
    ],
  };

  const trialkey =
    "MER1TDZwUGRjUk1VNk9BTHQtTnhzLWwwVWlzZEx4N2ZZLUtXUTN2aE96Mi45ZERNd0FqTjFjRE4zRWpPaUFIZWxKQ0xpUXpjaVJtTXhaek1tZDNheWgyYW5wbloyY1dOelF6Y3FGRE1mUldhc0ppT2lJV2R6SnllLjlKaU4xSXpVSUppT2ljR2JoSnll";
  return (
    <html
      lang="en"
      style={{ height: "100vh", boxSizing: "border-box", display: "flex" }}
      className={inter.className}
    >
      <body style={{ flex: 1, boxSizing: "border-box", display: "flex" }}>
        <SidebarProvider>
          <ReExtProvider
            ReExtData={ReExtData}
            splash={false}
            reextkey={trialkey}
          >
            <div
              className={inter.className}
              style={{ flex: 1, display: "flex" }}
            >
              {children}
            </div>
          </ReExtProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
