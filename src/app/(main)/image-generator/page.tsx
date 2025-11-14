'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import {
  Download,
  Maximize,
  Pen,
  Trash,
  Plus,
  Sparkles,
  Wand2,
  Loader,
} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {generateImageFromPrompt} from '@/ai/flows/generate-image-from-prompt';

type GeneratedImage = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export default function ImageGeneratorPage() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    try {
      const fullPrompt = `${prompt}, ${style} style`;
      const result = await generateImageFromPrompt({promptText: fullPrompt});
      const newImage: GeneratedImage = {
        id: `gen_${Date.now()}`,
        description: prompt,
        imageUrl: result.imageDataUri,
        imageHint: prompt.split(' ').slice(0, 2).join(' '),
      };
      setImages(prev => [newImage, ...prev]);
    } catch (e) {
      console.error(e);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>AI Image Generator</CardTitle>
          <CardDescription>
            Turn your text prompts into stunning visuals. Choose a style and describe your vision.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="prompt"
              placeholder="e.g., A majestic lion wearing a crown, cinematic lighting"
              className="h-12 text-base"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              disabled={isLoading}
            />
            <Select
              defaultValue="realistic"
              onValueChange={setStyle}
              disabled={isLoading}
            >
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
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Generating...' : 'Generate Image'}
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map(image => (
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
                  <Button size="icon" variant="secondary" asChild>
                    <a href={image.imageUrl} download={`generated-image-${image.id}.png`}>
                      <Download className="h-4 w-4" />
                    </a>
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
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setImages(imgs => imgs.filter(i => i.id !== image.id))}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
