import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
import { MediaGrid } from '@/components/home/media-grid'
import { NewsFeed } from '@/components/home/news-feed'
import { AboutSection } from '@/components/home/about-section'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <MediaGrid />
        <NewsFeed />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
