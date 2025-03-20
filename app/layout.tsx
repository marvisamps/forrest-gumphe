import './globals.css'
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  title: 'Forrest Gump - Story Development System',
  description: 'Sistema profissional para desenvolvimento de histórias e roteiros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body className={`${inter.className} bg-[#0A0F1C] text-white min-h-screen`}>
        <div className="relative">
          {/* Gradient background */}
          <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-[#0A0F1C] to-indigo-900/20 pointer-events-none" />
          {/* Content */}
          <div className="relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
} 