import {
  Pilcrow,
  SpellCheck,
  Lightbulb,
  Newspaper,
  Mail,
  ThumbsUp,
  Notebook,
} from "lucide-react"
import { ToolCard } from "@/components/tool-card"

export default function TextToolsPage() {
  const tools = [
    {
      icon: Pilcrow,
      title: "Paraphrasing Tool",
      description: "Rewrite your text in different tones and styles.",
      href: "/text-tools/paraphrase",
    },
    {
      icon: SpellCheck,
      title: "Grammar Correction",
      description: "Fix spelling, grammar, and punctuation errors.",
      href: "/text-tools/grammar",
    },
    {
      icon: Lightbulb,
      title: "Text-to-Ideas",
      description: "Generate creative ideas from a single sentence.",
      href: "/text-tools/ideas",
    },
    {
      icon: Newspaper,
      title: "Article Writer",
      description: "Generate full-length articles from a topic or outline.",
      href: "/text-tools/article",
    },
    {
      icon: Mail,
      title: "Email Writer",
      description: "Craft professional and effective emails in seconds.",
      href: "/text-tools/email",
    },
    {
      icon: ThumbsUp,
      title: "Social Media Captions",
      description: "Create engaging captions for your social media posts.",
      href: "/text-tools/captions",
    },
    {
      icon: Notebook,
      title: "Offline Text Editor",
      description: "A simple, offline-ready editor for your notes and drafts.",
      href: "/text-tools/editor",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Text Intelligence Tools
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Enhance your writing and generate content with the power of AI.
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
