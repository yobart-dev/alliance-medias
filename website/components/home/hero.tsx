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
      {/* Animated network background pattern - Global */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        {/* Nodes - Points du réseau */}
        {/* Top left cluster */}
        <div className="absolute top-[15%] left-[10%] w-4 h-4 rounded-full bg-sky-300 animate-pulse" />
        <div className="absolute top-[20%] left-[15%] w-3 h-3 rounded-full bg-primary animate-pulse delay-200" />
        <div className="absolute top-[25%] left-[8%] w-5 h-5 rounded-full bg-sky-400 animate-pulse delay-500" />
        
        {/* Top right cluster */}
        <div className="absolute top-[10%] right-[12%] w-6 h-6 rounded-full bg-primary animate-pulse delay-300" />
        <div className="absolute top-[18%] right-[18%] w-4 h-4 rounded-full bg-sky-300 animate-pulse delay-700" />
        <div className="absolute top-[25%] right-[10%] w-3 h-3 rounded-full bg-sky-400 animate-pulse delay-1000" />
        
        {/* Center cluster */}
        <div className="absolute top-[45%] left-[50%] w-8 h-8 rounded-full bg-primary/60 animate-pulse delay-400" />
        <div className="absolute top-[40%] left-[45%] w-5 h-5 rounded-full bg-sky-300 animate-pulse delay-600" />
        <div className="absolute top-[50%] left-[55%] w-4 h-4 rounded-full bg-sky-400 animate-pulse delay-800" />
        
        {/* Bottom left cluster */}
        <div className="absolute bottom-[20%] left-[15%] w-5 h-5 rounded-full bg-sky-300 animate-pulse delay-900" />
        <div className="absolute bottom-[15%] left-[20%] w-4 h-4 rounded-full bg-primary animate-pulse delay-1100" />
        <div className="absolute bottom-[25%] left-[10%] w-3 h-3 rounded-full bg-sky-400 animate-pulse delay-100" />
        
        {/* Bottom right cluster */}
        <div className="absolute bottom-[18%] right-[15%] w-6 h-6 rounded-full bg-primary animate-pulse delay-500" />
        <div className="absolute bottom-[12%] right-[20%] w-4 h-4 rounded-full bg-sky-300 animate-pulse delay-700" />
        <div className="absolute bottom-[22%] right-[10%] w-5 h-5 rounded-full bg-sky-400 animate-pulse delay-300" />
        
        {/* Additional scattered nodes */}
        <div className="absolute top-[35%] left-[25%] w-3 h-3 rounded-full bg-sky-300 animate-pulse delay-1200" />
        <div className="absolute top-[55%] right-[30%] w-4 h-4 rounded-full bg-primary animate-pulse delay-400" />
        <div className="absolute bottom-[40%] left-[35%] w-3 h-3 rounded-full bg-sky-400 animate-pulse delay-600" />
        <div className="absolute top-[60%] right-[25%] w-5 h-5 rounded-full bg-sky-300 animate-pulse delay-900" />
        
        {/* Connecting lines */}
        {/* Horizontal lines */}
        <div className="absolute top-[17%] left-[14%] w-20 h-px bg-gradient-to-r from-sky-300/50 to-transparent" />
        <div className="absolute top-[15%] right-[18%] w-24 h-px bg-gradient-to-l from-primary/50 to-transparent" />
        <div className="absolute bottom-[17%] left-[19%] w-32 h-px bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="absolute bottom-[20%] right-[20%] w-28 h-px bg-gradient-to-l from-sky-300/50 to-transparent" />
        
        {/* Vertical lines */}
        <div className="absolute top-[20%] left-[12%] w-px h-24 bg-gradient-to-b from-sky-400/50 to-transparent" />
        <div className="absolute top-[15%] right-[15%] w-px h-32 bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="absolute top-[45%] left-[48%] w-px h-20 bg-gradient-to-b from-sky-300/60 to-transparent" />
        
        {/* Diagonal lines */}
        <div className="absolute top-[20%] left-[15%] w-40 h-px bg-gradient-to-r from-primary/30 to-transparent rotate-45 origin-left" />
        <div className="absolute top-[18%] right-[18%] w-32 h-px bg-gradient-to-l from-sky-400/40 to-transparent -rotate-45 origin-right" />
        <div className="absolute bottom-[20%] left-[20%] w-36 h-px bg-gradient-to-r from-sky-300/35 to-transparent -rotate-45 origin-left" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-slate-900/80" />

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="flex flex-col items-center text-center space-y-12">
          
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
                  className="relative w-24 h-16 md:w-28 md:h-20 opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer group"
                >
                  <Image
                    src={media.src}
                    alt={media.name}
                    fill
                    className="object-contain group-hover:brightness-110 group-hover:saturate-0 group-hover:opacity-60"
                    style={{ filter: 'brightness(1)' }}
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                  {/* Overlay bleu sur hover */}
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply rounded-lg" />
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
