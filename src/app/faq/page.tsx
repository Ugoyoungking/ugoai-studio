import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is UGO AI Studio?",
    answer: "UGO AI Studio is a comprehensive suite of AI-powered tools designed to enhance creativity and productivity. It includes features like an intelligent chat assistant, an image generator, document analysis tools, and various text enhancement utilities."
  },
  {
    question: "Is UGO AI Studio free to use?",
    answer: "UGO AI Studio offers a free tier with generous limits for all its core features. For users who require higher usage limits or access to more advanced capabilities, we plan to introduce premium subscription plans in the future."
  },
  {
    question: "What kind of images can I generate?",
    answer: "You can generate a wide variety of images by providing text descriptions. The image generator supports multiple styles, including realistic, 3D render, anime, and abstract. Your imagination is the only limit!"
  },
  {
    question: "How does the Document AI work?",
    answer: "Our Document AI tools allow you to upload PDF documents and interact with them. You can ask the AI to summarize the content, explain complex topics in simple terms, or extract specific information, saving you hours of manual reading."
  },
  {
    question: "Who is behind UGO AI Studio?",
    answer: "UGO AI Studio is a project developed by Ugoyoungking, a software developer passionate about creating powerful and accessible AI tools. You can view his portfolio for more information."
  },
  {
    question: "How is my data handled?",
    answer: "We take your privacy very seriously. Your data is used to provide and improve the service, but it is not sold to third parties. For more detailed information, please read our Privacy Policy."
  }
]


export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Find answers to the most common questions about our platform.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
              className="font-medium text-foreground hover:underline"
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
          </div>
        </div>
      </footer>
    </div>
  )
}
