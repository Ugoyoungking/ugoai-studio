import Image from "next/image"
import {
  Download,
  Maximize,
  Pen,
  Trash,
  Plus,
  Sparkles,
  Wand2,
} from "lucide-react"

import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ImageGeneratorPage() {
  const images = PlaceHolderImages

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>AI Image Generator</CardTitle>
          <CardDescription>
            Turn your text prompts into stunning visuals. Choose a style and
            describe your vision.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="prompt"
              placeholder="e.g., A majestic lion wearing a crown, cinematic lighting"
              className="h-12 text-base"
            />
            <Select defaultValue="realistic">
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="3d">3D Render</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="logo">Logo</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="abstract">Abstract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Image
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <Card key={image.id} className="group overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary">
                    <Maximize className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 p-4">
              <p className="text-sm text-muted-foreground">
                {image.description}
              </p>
              <div className="flex w-full justify-between gap-2 mt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Pen className="mr-2 h-3 w-3" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Wand2 className="mr-2 h-3 w-3" /> Upscale
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
