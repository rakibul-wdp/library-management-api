import { Poppins } from "next/font/google";
import './globals.css';
import Header from "./components/Header";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"]
})

export const metadata = {
  title: 'rakibul-wdp repo',
  description: 'Full Stack Development and build Web application',
  keywords: "web development, web design, javascript, react, node, express, html, css"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
