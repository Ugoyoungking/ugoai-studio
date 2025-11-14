import {
  FileText,
  BookText,
  MessageSquareQuote,
  FileUp,
  FilePlus2,
} from "lucide-react"
import { ToolCard } from "@/components/tool-card"

export default function DocumentToolsPage() {
  const tools = [
    {
      icon: MessageSquareQuote,
      title: "PDF Summarizer",
      description: "Get a quick summary of any PDF document.",
      href: "/document-tools/summarizer",
    },
    {
      icon: FileText,
      title: "PDF to Text",
      description: "Extract all text content from your PDF files.",
      href: "/document-tools/to-text",
    },
    {
      icon: BookText,
      title: "Explain PDF Content",
      description: "Let AI explain complex PDF content in simple terms.",
      href: "/document-tools/explain",
    },
    {
      icon: FileUp,
      title: "PDF to DOCX",
      description: "Convert your PDF files into editable Word documents.",
      href: "/document-tools/to-docx",
    },
    {
      icon: FilePlus2,
      title: "AI PDF Generator",
      description: "Create a new PDF document from a text prompt or idea.",
      href: "/document-tools/generate-pdf",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Document & PDF AI Tools
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Powerful AI tools to understand, convert, and create documents.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.title}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            href={tool.href}
          />
        ))}
      </div>
    </div>
  )
}
