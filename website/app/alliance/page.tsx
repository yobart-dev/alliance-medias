import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Users, Award, Handshake, Radio, Shield, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { mockMediaPartners } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "L'Alliance Médias - Notre Mission",
  description: "Six médias indépendants unis pour une information locale fiable, riche et engagée en Provence-Alpes-Côte d'Azur.",
}

import { InteractiveMapClient } from '@/components/alliance/InteractiveMapClient'

export default function AlliancePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* HERO SECTION - Style Uber/Chime */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image 
              src="/alliance-team-photo-groupe.webp" 
              alt="L'équipe de l'Alliance des Médias" 
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </div>

          {/* Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#001F3F]/85 via-[#0052CC]/75 to-[#0066FF]/70" />

          {/* Network Pattern Background (optional) */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)',
                backgroundSize: '80px 80px',
                backgroundPosition: '0 0, 40px 40px'
              }}
            />
          </div>

          <div className="container mx-auto px-4 md:px-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold tracking-wide">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  FONDÉE EN 2024
                </span>
              </div>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tight">
                L'Alliance Médias
              </h1>

              <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed opacity-95 max-w-3xl mx-auto">
                Six médias indépendants unis pour une information locale fiable, riche et engagée
              </p>

              <div className="pt-4">
                <a 
                  href="#mission" 
                  className="inline-flex items-center gap-3 bg-white text-primary px-9 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                >
                  <span>Découvrir l'Alliance</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center opacity-70 animate-bounce">
            <div className="text-3xl mb-2">↓</div>
            <div className="text-sm font-medium">Scroll pour découvrir</div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          {/* Network pattern background inspired by logo */}
          <div className="absolute inset-0 opacity-5">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="network-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  {/* Connections lines */}
                  <line x1="50" y1="50" x2="100" y2="80" stroke="currentColor" strokeWidth="1" className="text-primary" />
                  <line x1="100" y1="80" x2="150" y2="60" stroke="currentColor" strokeWidth="1" className="text-primary" />
                  <line x1="100" y1="80" x2="120" y2="140" stroke="currentColor" strokeWidth="1" className="text-primary" />
                  <line x1="150" y1="60" x2="170" y2="110" stroke="currentColor" strokeWidth="1" className="text-primary" />
                  <line x1="120" y1="140" x2="170" y2="110" stroke="currentColor" strokeWidth="1" className="text-primary" />
                  {/* Nodes */}
                  <circle cx="50" cy="50" r="6" fill="currentColor" className="text-primary" opacity="0.6" />
                  <circle cx="100" cy="80" r="10" fill="currentColor" className="text-primary" opacity="0.8" />
                  <circle cx="150" cy="60" r="7" fill="currentColor" className="text-primary" opacity="0.5" />
                  <circle cx="120" cy="140" r="8" fill="currentColor" className="text-primary" opacity="0.7" />
                  <circle cx="170" cy="110" r="9" fill="currentColor" className="text-primary" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#network-pattern)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 md:px-20 max-w-[1400px] relative z-10">
            {/* Header */}
            <div className="text-center mb-16 md:mb-20">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                L'Alliance en chiffres
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Une force collective qui rassemble des médias locaux indépendants pour offrir une information de proximité de qualité à travers toute la région PACA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {[
                { 
                  number: '6', 
                  label: 'Médias membres\nindépendants',
                  gradient: 'from-blue-600 to-purple-600',
                  textColor: 'text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600'
                },
                { 
                  number: '80+', 
                  label: 'Années d\'expérience\ncumulées',
                  gradient: 'from-purple-600 to-pink-600',
                  textColor: 'text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600'
                },
                { 
                  number: '6', 
                  label: 'Départements PACA\ncouverts',
                  gradient: 'from-blue-600 to-cyan-500',
                  textColor: 'text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-500'
                },
                { 
                  number: '600K+', 
                  label: 'Lecteurs & auditeurs\nchaque mois',
                  gradient: 'from-purple-600 to-blue-600',
                  textColor: 'text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-600'
                },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="relative group"
                >
                  <div className="aspect-square flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                    {/* Number with gradient */}
                    <div className={`text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none mb-4 tracking-tight ${stat.textColor}`}>
                      {stat.number}
                    </div>
                    
                    {/* Label */}
                    <div className="text-base md:text-lg text-gray-600 font-semibold leading-snug whitespace-pre-line">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Decorative gradient circle behind on hover */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION SECTION - Layout Asymétrique */}
        <section id="mission" className="py-28 md:py-36 bg-gray-50 relative">
          <div className="container mx-auto px-4 md:px-20 max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left: Content */}
              <div className="space-y-8">
                <div className="text-sm font-bold text-primary uppercase tracking-widest mb-5">
                  NOTRE RAISON D'ÊTRE
                </div>
                
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight">
                  Fédérer les voix indépendantes de Provence
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Fondée en 2024, l'Alliance des Médias PACA est née d'un constat simple : face à la complexité du monde actuel, l'information locale n'a jamais été aussi essentielle pour comprendre notre environnement immédiat.
                </p>

                <div className="space-y-6 pt-6">
                  {[
                    {
                      title: 'Indépendance éditoriale',
                      description: 'Chaque média reste totalement libre de sa ligne éditoriale et de ses choix de traitement'
                    },
                    {
                      title: 'Ancrage territorial fort',
                      description: 'Nos rédactions sont implantées localement depuis des décennies'
                    },
                    {
                      title: 'Pluralisme de l\'information',
                      description: 'Diversité des spécialités garantissant une couverture complète'
                    },
                  ].map((pillar, index) => (
                    <div 
                      key={index}
                      className="flex gap-5 p-6 bg-white rounded-2xl transition-all duration-300 hover:translate-x-2 hover:shadow-lg group"
                    >
                      {/* Network node style - inspired by logo */}
                      <div className="flex-shrink-0 relative w-12 h-12">
                        {/* Central circle - blue */}
                        <div className="absolute inset-0 rounded-full bg-white border-4 border-primary group-hover:scale-110 transition-transform duration-300 shadow-lg" />
                        {/* Inner dot */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-primary" />
                        </div>
                        {/* Animated pulse ring */}
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                        {/* Connection lines (decorative) */}
                        <div className="absolute top-1/2 -left-2 w-2 h-px bg-primary/30" />
                        <div className="absolute top-1/2 -right-2 w-2 h-px bg-primary/30" />
                        <div className="absolute left-1/2 -top-2 h-2 w-px bg-primary/30" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{pillar.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC]/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                  <img 
                    src="/journalists-meeting-collaboration.jpg" 
                    alt="Journalistes en collaboration" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP SECTION - Full Width */}
        <section className="py-28 md:py-36 bg-white">
          <div className="text-center max-w-4xl mx-auto mb-20 px-4">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Notre Couverture Territoriale
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Une présence réelle sur l'ensemble de la région Provence-Alpes-Côte d'Azur
            </p>
          </div>

          <div className="container mx-auto px-4 md:px-20 max-w-[1600px]">
            <InteractiveMapClient />

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-16">
              {mockMediaPartners.map((media, index) => (
                <div 
                  key={media.id}
                  className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md text-gray-900 font-semibold"
                >
                  <div 
                    className="w-5 h-5 rounded-full"
                    style={{ 
                      backgroundColor: [
                        '#4169E1', '#FFB347', '#98D8C8', 
                        '#F7CAC9', '#E74C3C', '#9B59B6'
                      ][index] 
                    }}
                  />
                  <span>{media.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MEDIA GRID SECTION - Style Chime */}
        <section className="py-28 md:py-36 bg-gray-50">
          <div className="container mx-auto px-4 md:px-20 max-w-[1600px]">
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Les Médias de l'Alliance
              </h2>
              <p className="text-xl md:text-2xl text-gray-600">
                Six rédactions, six identités, une même exigence de qualité
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {mockMediaPartners.map((media) => (
                <div 
                  key={media.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image/Logo Area */}
                  <div className="h-56 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    <img 
                      src={media.bgImage || '/placeholder.svg'} 
                      alt={media.name}
                      className="relative w-32 h-32 object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                      {media.name}
                    </h3>
                    <div className="text-sm text-gray-500 mb-4">
                      Depuis {media.founded}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {media.description}
                    </p>

                    {/* Meta */}
                    <div className="space-y-2 mb-6 pt-5 border-t border-gray-100">
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <span>📍</span>
                        <span>{media.coverage}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <span>🎯</span>
                        <span>{media.specialties.slice(0, 3).join(', ')}</span>
                      </div>
                    </div>

                    <a 
                      href={media.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-3 transition-all"
                    >
                      <span>Visiter le site</span>
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION - Full Width Impact */}
        <section className="py-28 md:py-36 bg-gradient-to-br from-[#001F3F] via-[#0052CC] to-[#0066FF] text-white relative overflow-hidden">
          {/* Pattern Background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)',
              backgroundSize: '60px 60px'
            }}
          />

          <div className="container mx-auto px-4 md:px-20 max-w-[1400px] relative z-10">
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                Vous êtes un média local indépendant ?
              </h2>
              <p className="text-2xl md:text-3xl opacity-95 leading-relaxed">
                Rejoignez l'Alliance et renforcez votre impact territorial
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
              {[
                {
                  icon: Handshake,
                  title: 'Mutualisation des ressources',
                  description: 'Partagez contenus, bonnes pratiques et outils pour gagner en efficacité'
                },
                {
                  icon: Radio,
                  title: 'Visibilité accrue',
                  description: 'Amplifiez votre portée auprès d\'un public régional élargi'
                },
                {
                  icon: Shield,
                  title: 'Défense collective',
                  description: 'Plus de poids face aux défis économiques et réglementaires'
                },
              ].map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 transition-all duration-300 hover:bg-white/15 hover:-translate-y-1"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
                      <Icon className="h-9 w-9 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-white/90 leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-12 py-7 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/contact">
                  <span>Contactez-nous</span>
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
