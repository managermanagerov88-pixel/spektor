
import "./globals.css";
import Script from "next/script";
import TelegramInit from "./telegram-init";

export const metadata = {
  title: "SPEKTOR — Digital Education",
  description: "Premium digital education platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <TelegramInit />
        {children}
      </body>
    </html>
  );
}
