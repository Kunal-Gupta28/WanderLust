import "./globals.css";
import SmoothScroll from "../components/smooth-scroll";
import QueryProvider from "../components/query-provider";
import ErrorBoundary from "../components/error-boundary";

export const metadata = {
  title: "WanderLust — Stays with a story",
  description: "Find places worth remembering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <style>{`
          :root {
            --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            --font-display: 'Playfair Display', Georgia, serif;
          }
        `}</style>
      </head>
      <body>
        <QueryProvider>
          <ErrorBoundary>
            <SmoothScroll>{children}</SmoothScroll>
          </ErrorBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}

