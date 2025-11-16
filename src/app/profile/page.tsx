import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ProfilePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ugochukwu Jonathan",
    "alternateName": "Ugoyoungking",
    "jobTitle": "Web Developer, AI Engineer, UI/UX Designer",
    "url": "https://ugoai-studio.vercel.app/profile",
    "sameAs": [
      "https://ugoyoungking.github.io/portfolio/",
      "https://www.truelancer.com/freelancer/tlusera2eae11",
      "https://www.linkedin.com/in/ugoyoungking/",
      "https://github.com/ugoyoungking"
    ],
    "email": "mailto:ugochukwujonathan067@gmail.com",
    "telephone": "+2349127714886",
    "worksFor": {
      "@type": "Organization",
      "name": "UGOAI Studio"
    },
    "image": "https://image2url.com/images/1763225334695-2ec6f3a1-974a-4506-9923-7bb2d19f5cf6.png"
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <header className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image src="/logo.svg" width={28} height={28} alt="UGO AI Studio" />
          <span>UGO AI Studio</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight">
            About the Developer
          </h1>
          <div className="mt-8">
             <Image 
                src="https://image2url.com/images/1763225334695-2ec6f3a1-974a-4506-9923-7bb2d19f5cf6.png" 
                alt="Ugochukwu Jonathan"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
            <h2 className="text-3xl font-bold">Ugochukwu Jonathan</h2>
            <p className="text-lg text-muted-foreground mt-2">Web Developer, AI Engineer, & Graphic Designer</p>
          </div>
          <p className="mt-6 text-lg max-w-3xl mx-auto">
            I’m a passionate and God-fearing developer dedicated to crafting modern, responsive, and user-focused digital experiences. My journey began with HTML and CSS, and over time, I’ve mastered technologies like JavaScript, React, and Node.js. I take pride in transforming creative ideas into functional, visually appealing, and high-performing websites that don’t just look great — they make an impact. Every project I build reflects my commitment to excellence, creativity, and faith-driven purpose.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <a href="https://ugoyoungking.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
                View My Portfolio <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </main>

       <footer className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
         <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} UGO AI Studio. Made by{" "}
            <a
              href="https://ugoyoungking.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Ugoyoungking
            </a>
            .
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
             <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
             <Link href="/how-to-use" className="text-sm text-muted-foreground hover:text-foreground">
              How to Use
            </Link>
            <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">
              Profile
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
