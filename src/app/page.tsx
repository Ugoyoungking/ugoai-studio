import Link from "next/link"
import { ArrowRight, Bot, FileText, ImageIcon, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UGOAI Studio | AI Creation Platform for Agents, Workflows & Tools',
  description:
    'Build intelligent agents, chatbots, automation, and generative AI tools with UGOAI Studio. Our platform supports multiple AI models and provides everything you need to innovate.',
  openGraph: {
    images: [
      {
        url: 'https://image2url.com/images/1763225334695-2ec6f3a1-974a-4506-9923-7bb2d19f5cf6.png',
        width: 1200,
        height: 630,
        alt: 'UGOAI Studio Banner',
      },
    ],
  },
};


export default function LandingPage() {
  const features = [
    {
      icon: Bot,
      title: "AI Chat",
      description: "Engage in intelligent conversations, get instant answers, and generate creative text formats.",
    },
    {
      icon: ImageIcon,
      title: "Image Generator",
      description: "Turn your imagination into stunning visuals. Create unique images from text descriptions in seconds.",
    },
    {
      icon: FileText,
      title: "Document AI",
      description: "Summarize, analyze, and generate insights from your PDF documents with powerful AI tools.",
    },
    {
      icon: Type,
      title: "Text Intelligence",
      description: "Enhance your writing with tools for paraphrasing, grammar correction, and idea generation.",
    },
  ]
  
  const landingPageSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "UGOAI Studio",
      "alternateName": "UGO AI Studio",
      "applicationCategory": "AI Platform, SaaS, Developer Tool",
      "operatingSystem": "Web, Android PWA, iOS PWA",
      "description": "UGOAI Studio is a next-generation AI creation platform that enables developers, businesses, and creators to build intelligent agents, chatbots, automation workflows, and generative AI tools with models like OpenAI, Gemini, Meta, and more.",
      "softwareVersion": "1.0.0",
      "creator": {
        "@type": "Person",
        "name": "Ugochukwu Jonathan",
        "alternateName": "Ugoyoungking",
        "jobTitle": "Web Developer, AI Engineer, UI/UX Designer",
        "url": "https://ugoyoungking.github.io/portfolio",
        "email": "mailto:ugochukwujonathan067@gmail.com",
        "telephone": "+2349127714886"
      },
      "brand": {
        "@type": "Brand",
        "name": "UGOAI",
        "logo": "https://image2url.com/images/1763225334695-2ec6f3a1-974a-4506-9923-7bb2d19f5cf6.png"
      },
      "url": "https://ugoai-studio.vercel.app/",
      "image": "https://image2url.com/images/1763225334695-2ec6f3a1-974a-4506-9923-7bb2d19f5cf6.png",
      "keywords": [
        "AI Studio",
        "AI Agent Builder",
        "AI SaaS Platform",
        "Workflow Automation",
        "Generative AI Tools",
        "AI API",
        "Chatbot Builder",
        "AI Marketplace",
        "UGOAI Studio"
      ],
      "featureList": [
        "AI Agent Builder",
        "RAG Knowledge Base",
        "Marketplace for AI Tools",
        "Conversational AI Chatbots",
        "Image Generation",
        "Video Generation",
        "Automation Workflows",
        "Developer API",
        "Multi-model support",
        "PWA Offline Mode"
      ]
    },
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "UGOAI Studio",
      "image": "https://image2url.com/images/1763225334695-2ec6f3a1-974a-4506-9923-7bb2d19f5cf6.png",
      "description": "A powerful AI platform for building agents, automations, and generative AI tools.",
      "sku": "UGOAI-STUDIO-001",
      "brand": {
        "@type": "Brand",
        "name": "UGOAI"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://ugoai-studio.vercel.app/signup",
        "priceCurrency": "USD",
        "price": "0.00",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2025-12-31"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "UGOAI Studio - AI Creation Platform",
      "description": "Create AI agents, automation workflows, chatbots, and generative tools using UGOAI Studio.",
      "url": "https://ugoai-studio.vercel.app/"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingPageSchemas) }}
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

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter font-headline">
              Your Personal AI-Powered Creation Suite
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock your creative potential with a suite of intelligent tools. From writing assistants to image generators, UGO AI Studio has everything you need to create, innovate, and inspire.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/chat">Try the AI Chat</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted/40 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">
                A Universe of AI Tools
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Whatever you need to create, our AI is here to help you do it faster and better.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 transition-all hover:shadow-md hover:-translate-y-1">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about-dev" className="py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">
                About the Developer
              </h2>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-muted-foreground mb-8">
                I’m Ugochukwu, a passionate and God-fearing Web Developer and Graphic Designer dedicated to crafting modern, responsive, and user-focused digital experiences. My journey began with HTML and CSS, and over time, I’ve mastered technologies like JavaScript, React, and Node.js. I take pride in transforming creative ideas into functional, visually appealing, and high-performing websites that don’t just look great — they make an impact. Every project I build reflects my commitment to excellence, creativity, and faith-driven purpose.
              </p>
              <Button asChild>
                <a href="https://ugoyoungking.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
                  View My Portfolio <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

         <section id="faq" className="py-20 sm:py-24 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">
                Have Questions?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about UGO AI Studio.
              </p>
               <div className="mt-8 flex justify-center">
                <Button asChild>
                  <Link href="/faq">
                    Read our FAQ
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

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
