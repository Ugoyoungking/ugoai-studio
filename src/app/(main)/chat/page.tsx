'use client';
import React, {useState, useRef, useEffect} from 'react';
import {
  Bot,
  MoreHorizontal,
  PlusCircle,
  Send,
  Trash,
  FilePenLine,
  Loader,
  Copy,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Check,
} from 'lucide-react';
import {marked} from 'marked';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Badge} from '@/components/ui/badge';
import {chat} from '@/ai/flows/chat-flow';
import type {ChatInput} from '@/ai/flows/chat-flow.schema';
import {useToast} from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const CodeBlock = ({
  lang,
  code,
}: {
  lang: string | undefined;
  code: string;
}) => {
  const {toast} = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast({
      title: 'Code copied!',
      description: 'The code block has been copied to your clipboard.',
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg bg-[#2d2d2d] text-sm">
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-zinc-700">
        <span className="text-xs text-zinc-400">{lang || 'code'}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          backgroundColor: 'transparent',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'var(--font-code)',
          },
        }}
      >
        {String(code)}
      </SyntaxHighlighter>
    </div>
  );
};

export default function ChatPage() {
  const {toast} = useToast();
  const [chats, setChats] = useState([
    {id: 1, title: 'React Server Components', time: '1h ago', active: true},
    {id: 2, title: 'Next.js 15 App Router', time: '5m ago', active: false},
    {id: 3, title: 'Firebase Integration', time: '3h ago', active: false},
    {id: 4, title: 'Image Generation Prompts', time: '1d ago', active: false},
    {id: 5, title: 'Social Media Captions', time: '2d ago', active: false},
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: 'Hello! How can I help you today?',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (
    e: React.FormEvent,
    messageToSend?: string
  ) => {
    e.preventDefault();
    const currentMessage = messageToSend || input;
    if (!currentMessage.trim()) return;

    if (!messageToSend) {
      const userMessage: Message = {role: 'user', content: currentMessage};
      setMessages(prev => [...prev, userMessage]);
      setInput('');
    }

    setIsLoading(true);

    const chatHistory: ChatInput['history'] = messages
      .filter(
        msg =>
          !(
            messageToSend &&
            msg.role === 'model' &&
            messages.indexOf(msg) === messages.length - 1
          )
      )
      .map(msg => ({
        role: msg.role as 'user' | 'model',
        content: [{text: msg.content}],
      }));

    try {
      const result = await chat({
        history: chatHistory,
        message: currentMessage,
      });
      const aiMessage: Message = {role: 'model', content: result.message};
      if (messageToSend) {
        setMessages(prev => [...prev.slice(0, -1), aiMessage]);
      } else {
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Sorry, I ran into an error. Please try again.',
      };
      if (messageToSend) {
        setMessages(prev => [...prev.slice(0, -1), errorMessage]);
      } else {
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = (e: React.FormEvent) => {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (lastUserMessage) {
      handleSendMessage(e, lastUserMessage.content);
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied to clipboard!',
      description: 'The message content has been copied.',
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const renderMessageContent = (content: string) => {
    const renderer = new marked.Renderer();
    renderer.code = (code, lang) => {
      // This is a bit of a hack to pass the code to a React component
      // We'll use a placeholder and then replace it.
      const id = `code-block-${Math.random().toString(36).substring(7)}`;
      return `<div id="${id}" data-lang="${lang}" data-code="${encodeURIComponent(
        code
      )}"></div>`;
    };

    const parsedHtml = marked(content, { renderer });
    
    // After parsing, we can't directly render the HTML with React components.
    // So, we'll need to parse the HTML string and replace placeholders.
    // This is complex to do safely. A better approach is to parse tokens.

    const tokens = marked.lexer(content);
    return tokens.map((token, index) => {
      if (token.type === 'code') {
        return (
          <CodeBlock
            key={index}
            lang={token.lang}
            code={token.text}
          />
        );
      }
      // For other token types, render them as HTML.
      // We need to wrap the single token in a `tokens` array with a `links` property.
      const html = marked.parser([token], { renderer: new marked.Renderer() });
      return (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    });
  };

  return (
    <div className="grid h-[calc(100vh-6rem)] w-full grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
      <Card className="hidden md:flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <CardTitle className="text-lg">Chats</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New Chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-1 p-2">
              {chats.map(chatItem => (
                <div
                  key={chatItem.id}
                  className={`flex items-start justify-between p-3 rounded-lg cursor-pointer transition-colors group ${
                    chatItem.active
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm leading-tight">
                      {chatItem.title}
                    </span>
                    <span
                      className={`text-xs ${
                        chatItem.active
                          ? 'text-primary/80'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {chatItem.time}
                    </span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                          >
                            <FilePenLine className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Rename</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                <CardTitle className="text-lg">AI Chat</CardTitle>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                  <Badge variant="outline">Developer Mode</Badge>
                  <span>{messages.length} messages</span>
                </div>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More Options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <ScrollArea
              className="h-[calc(100vh-18rem)]"
              ref={scrollAreaRef as any}
            >
              <div className="p-6 space-y-8">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-start gap-3 group/message ${
                      message.role === 'user' ? 'items-end' : ''
                    }`}
                  >
                    <div
                      className={`flex items-start gap-4 ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      {message.role === 'model' && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Bot className="h-5 w-5" />
                        </div>
                      )}
                      <div
                        className={`max-w-2xl rounded-lg px-4 py-3 text-sm prose dark:prose-invert prose-p:my-3 prose-headings:my-4 prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                         <div>{renderMessageContent(message.content)}</div>
                      </div>
                    </div>
                    {message.role === 'model' &&
                      index === messages.length - 1 &&
                      !isLoading && (
                        <div className="flex gap-1 self-start ml-12 -mt-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleCopy(message.content)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={handleRegenerate}
                                >
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Regenerate</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Good response</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                >
                                  <ThumbsDown className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Bad response</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="max-w-xl rounded-lg p-4 text-sm bg-muted flex items-center">
                      <Loader className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="relative w-full">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="pr-12 h-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
