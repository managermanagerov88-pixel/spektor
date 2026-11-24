
import "./globals.css";
import Script from "next/script";

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
      <body>{children}</body>
    </html>
  );
}
