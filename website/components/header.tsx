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
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 text-sm overflow-x-auto">
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
        <div className="container mx-auto px-4">
          <div className="flex h-24 items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="relative h-20 w-60">
                <Image
                  src="/logo-alliance-medias.webp"
                  alt="L'Alliance Médias"
                  fill
                  className="object-contain"
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
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                <nav className="flex flex-col gap-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
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
