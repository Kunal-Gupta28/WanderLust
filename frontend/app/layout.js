import "./globals.css";
import SmoothScroll from "../components/smooth-scroll";

export const metadata = {
  title: "WanderLust — Stays with a story",
  description: "Find places worth remembering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="font-sans">
      <head>
        <style>{`
          :root {
            --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            --font-display: 'Playfair Display', Georgia, serif;
          }
        `}</style>
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

