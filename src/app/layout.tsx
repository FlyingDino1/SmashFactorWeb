import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
}
 
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
          <meta />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>My App</title>
          <meta name="description" content="My App is a..." />
        </head>
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    )
  }