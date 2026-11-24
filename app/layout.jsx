
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "SPEKTOR — Digital Education",
  description: "Premium digital education platform"
};

function TelegramInit() {
  return (
    <Script
      id="telegram-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
          }
        `
      }}
    />
  );
}

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
