import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Providers from "./Providers";

export const metadata = {
  title: "Elite Path",
  description: "Discover top destinations and experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
