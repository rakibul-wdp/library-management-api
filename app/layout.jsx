import './globals.css'

export const metadata = {
  title: 'rakibul-wdp repo',
  description: 'Full Stack Development and build Web application',
  keywords: "web development, web design, javascript, react, node, express, html, css"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
