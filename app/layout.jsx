
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
      <body>
        <Script
          id="telegram-init"
          strategy="afterInteractive"
        >
          {`
            (function () {
              function initializeTelegram() {
                if (
                  window.Telegram &&
                  window.Telegram.WebApp
                ) {
                  window.Telegram.WebApp.ready();
                  window.Telegram.WebApp.expand();
                  window.dispatchEvent(
                    new Event("telegram-webapp-ready")
                  );
                }
              }

              if (
                window.Telegram &&
                window.Telegram.WebApp
              ) {
                initializeTelegram();
              } else {
                window.addEventListener(
                  "load",
                  initializeTelegram
                );
                setTimeout(initializeTelegram, 500);
              }
            })();
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
