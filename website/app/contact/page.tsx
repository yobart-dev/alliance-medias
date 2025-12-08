import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ContactForm } from '@/components/contact/ContactForm'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                  Contactez-nous
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Une question, une proposition de partenariat ou une demande presse ? 
                  Notre équipe est à votre écoute.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                  <Card className="p-6 space-y-6 border-l-4 border-l-primary">
                    <h3 className="font-heading text-xl font-bold">Nos Coordonnées</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Siège Social</p>
                          <p className="text-sm text-muted-foreground">
                            45 Rue de la République<br />
                            13002 Marseille<br />
                            France
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <a href="mailto:contact@alliance-medias.fr" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            contact@alliance-medias.fr
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Téléphone</p>
                          <a href="tel:+33491000000" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            +33 4 91 00 00 00
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-primary text-primary-foreground">
                    <h3 className="font-heading text-xl font-bold mb-4">Espace Presse</h3>
                    <p className="text-sm text-primary-foreground/80 mb-6">
                      Vous êtes journaliste et souhaitez obtenir des informations sur l'Alliance ?
                      Téléchargez notre dossier de presse.
                    </p>
                    <Button variant="secondary" className="w-full">
                      Télécharger le Kit Presse
                    </Button>
                  </Card>
                </div>

                {/* Contact Form */}
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
