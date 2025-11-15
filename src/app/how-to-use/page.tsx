import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HowToUsePage() {
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
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
          <h1>How to Use UGO AI Studio</h1>
          <p className="text-muted-foreground">A guide to getting the most out of our AI tools.</p>

          <h2>Getting Started</h2>
          <p>
            Welcome to UGO AI Studio! To begin, simply navigate to the tool you'd like to use from the main sidebar. Most features are available immediately, though some may require you to sign up for a free account to save your work.
          </p>

          <h2>Using the AI Chat</h2>
          <p>
            The AI Chat is your conversational partner. You can ask it questions, request it to write content, or help you brainstorm. It understands context, so you can have natural, flowing conversations. Try asking for a "list of five startup ideas" or to "write a poem about space."
          </p>

          <h2>Using the Image Generator</h2>
          <p>
            Navigate to the Image Generator. In the prompt box, describe the image you want to create. Be as descriptive as possible for the best results! For example, instead of "a dog," try "a photorealistic portrait of a golden retriever wearing a tiny superhero cape, sitting in a field of flowers." You can also select different artistic styles to influence the final output.
          </p>
          
          <h2>Using the Document Tools</h2>
          <p>
            Go to the Document Tools section and select a tool like "PDF Summarizer." You will be prompted to upload a PDF file. Once uploaded, the AI will process the document and provide you with a concise summary, explain complex parts, or extract text, depending on the tool you've chosen.
          </p>

          <h2>Using the Text Tools</h2>
          <p>
            The Text Intelligence section contains tools to improve your writing. For instance, the Paraphrasing Tool allows you to input text and get rewritten versions in different tones. The Grammar Correction tool will help you find and fix errors in your writing.
          </p>
          
          <h2>Saving Your Work</h2>
          <p>
            To save your chats, generated images, and other creations, you will need to sign up for a free account. This will give you access to your personal workspace where you can manage all your projects.
          </p>
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
          </div>
        </div>
      </footer>
    </div>
  )
}
