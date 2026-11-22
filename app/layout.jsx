
import "./globals.css";

export const metadata = {
  title: "SPEKTOR — Digital Education",
  description: "Premium digital education platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
