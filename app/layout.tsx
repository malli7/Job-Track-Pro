import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JobTrack Pro',
  description: 'Track your job applications with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-white shadow-md mt-8">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
              © 2025 JobTrack Pro. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

