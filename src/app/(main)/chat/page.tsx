"use client"
import {
  Bot,
  MoreHorizontal,
  PlusCircle,
  Send,
  Trash,
  FilePenLine,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function ChatPage() {
  const chats = [
    { id: 1, title: "Next.js 15 App Router", time: "5m ago" },
    { id: 2, title: "React Server Components", time: "1h ago", active: true },
    { id: 3, title: "Firebase Integration", time: "3h ago" },
    { id: 4, title: "Image Generation Prompts", time: "1d ago" },
    { id: 5, title: "Social Media Captions", time: "2d ago" },
  ]

  const messages = [
    {
      role: "user",
      content:
        "Explain React Server Components and how they differ from Client Components.",
    },
    {
      role: "ai",
      content:
        "Of course! **React Server Components (RSCs)** are a new type of component that runs exclusively on the server. They are designed to improve performance by reducing the amount of JavaScript sent to the client.\n\nHere's the key difference:\n\n*   **Server Components:** Run on the server. They can directly access server-side resources like databases or filesystems. They don't have state (no `useState`) or lifecycle effects (no `useEffect`) and render to an intermediate format, not directly to the DOM.\n*   **Client Components:** Are the traditional React components we're used to. They run on the client, can have state and effects, and handle user interactions.",
    },
    {
      role: "user",
      content: "So, when would I use one over the other?",
    },
  ]

  return (
    <div className="grid h-[calc(100vh-6rem)] w-full grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
      <Card className="hidden md:flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <CardTitle className="text-lg">Chats</CardTitle>
          <Button size="icon" variant="ghost">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-1 p-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-start justify-between p-3 rounded-lg cursor-pointer transition-colors group ${
                    chat.active
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm leading-tight">
                      {chat.title}
                    </span>
                    <span
                      className={`text-xs ${
                        chat.active ? "text-primary/80" : "text-muted-foreground"
                      }`}
                    >
                      {chat.time}
                    </span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7">
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="flex flex-col h-full">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <CardTitle className="text-lg">
                  React Server Components
                </CardTitle>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                  <Badge variant="outline">Developer Mode</Badge>
                  <span>3 messages</span>
                </div>
              </div>
            </div>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <ScrollArea className="h-[calc(100vh-18rem)]">
              <div className="p-6 space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 ${
                      message.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.role === "ai" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Bot className="h-5 w-5" />
                      </div>
                    )}
                    <div
                      className={`max-w-xl rounded-lg p-4 text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div
                        className="prose prose-sm dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="relative w-full">
              <Input
                placeholder="Ask anything..."
                className="pr-12 h-12"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
