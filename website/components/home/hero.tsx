import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const mediaLogos = [
    { name: "Bleu Tomate", src: "/Logo-bleue-tomates-medias.jpg.webp" },
    { name: "Sport MED", src: "/sport-med.webp" },
    { name: "L'EFM", src: "/LEHTV-logo-medias.png.webp" },
    { name: "mprovence", src: "/LOGO-MPROVENCE-768x154.png.webp" },
    { name: "Marcelle", src: "/marcelle-logo.webp" },
    { name: "Fréquence Mistral", src: "/frequence-mistral-logo.png.webp" },
  ]

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-primary to-slate-900">
      {/* Animated network background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-2 border-white/30 animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full border-2 border-white/20" />
        <div className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full border-2 border-white/40 animate-pulse delay-300" />
        <div className="absolute bottom-20 right-1/4 w-20 h-20 rounded-full border-2 border-white/30 animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full border-2 border-white/20" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-slate-900/80" />

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Network visual decoration */}
          <div className="relative w-full max-w-4xl flex justify-center items-center gap-8 mb-8 opacity-30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-sky-300 animate-pulse delay-150" />
            </div>
            <div className="w-6 h-6 rounded-full bg-primary animate-pulse delay-300" />
            <div className="w-1 h-16 bg-gradient-to-b from-primary/50 to-transparent" />
            <div className="w-6 h-6 rounded-full bg-primary animate-pulse delay-500" />
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-sky-300 animate-pulse delay-700" />
              <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse delay-1000" />
            </div>
          </div>

          {/* Logo principal */}
          <div className="relative w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Image
              src="/logo-alliance-medias-white-transp.webp"
              alt="L'Alliance Médias PACA"
              width={900}
              height={300}
              priority
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          {/* Logos des médias adhérents - Juste sous le logo */}
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
              {mediaLogos.map((media) => (
                <div 
                  key={media.name} 
                  className="relative w-24 h-16 md:w-28 md:h-20 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <Image
                    src={media.src}
                    alt={media.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            L'information <span className="text-sky-300 font-semibold">locale, unie et plurielle</span>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <Button 
              size="lg" 
              className="gap-2 group bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-base px-8 py-6" 
              asChild
            >
              <Link href="#medias">
                Découvrir nos médias
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/40 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 transition-all duration-300 hover:scale-105 text-base px-8 py-6"
              asChild
            >
              <Link href="/actualites">Voir les actualités</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
