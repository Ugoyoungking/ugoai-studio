import { config } from 'dotenv';
config();

import '@/ai/flows/generate-pdf-from-text.ts';
import '@/ai/flows/generate-image-from-prompt.ts';
import '@/ai/flows/explain-pdf-content.ts';
import '@/ai/flows/generate-ideas-from-text.ts';
import '@/ai/flows/chat-flow';
import '@/ai/flows/generate-chat-title-flow';
