"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const breakingNews = [
  "2028 Sir: Vous nous régional spécialisée en Provence-Alpes-Côte d'Azur.",
  "BREAKINGNEWTS Traneis mayan h...",
  "Dernière actualité de la région PACA",
]

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "L'Alliance", href: "/alliance" },
  { name: "Actualités", href: "/actualites" },
  { name: "Nos Médias", href: "/#medias" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-primary text-primary-foreground py-3 px-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 text-sm">
            <div className="flex items-center gap-2 whitespace-nowrap font-bold">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              BREAKING NEWS
            </div>
            <div className="animate-pulse">{breakingNews[0]}</div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="relative h-16 w-52">
                <Image
                  src="/logo-alliance-medias.webp"
                  alt="L'Alliance Médias"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-md font-bold text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="mobile-menu-trigger">
                  <Menu className="mobile-menu-icon" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full max-w-full border-none bg-gradient-to-br from-slate-900/70 via-slate-800/70 to-primary/40 backdrop-blur-sm !bg-transparent"
              >
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                <nav className="flex flex-col gap-8 mt-24 ml-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-2xl font-bold text-white/90 transition-all duration-300 hover:text-white hover:translate-x-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
